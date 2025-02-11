import { EditableComponents } from "@/components/table/editable";
import { axiosInstance } from "@/utility";
import { useApiUrl, useCustomMutation } from "@refinedev/core";
import { Button, Col, message, Row, Table, Upload } from "antd";
import { ColumnsType } from "antd/es/table";
import { UploadFile } from "antd/lib";
import { get } from "lodash";
import { useEffect, useRef, useState } from "react";

interface IBatchUpload {
    editable?: boolean;
    showDefaultColumns?: boolean;
    columns: ColumnsType<any>;
    dataSource?: IBatchUploadDataSource[];
    isLoading?: boolean;
    onFileListChange?: (FileList: Partial<IBatchUploadDataSource>) => void
}

interface IBatchUploadBaseDataSource {
    file_name: string,
    file_path: string,
    file_url?: string,
}
type IBatchUploadDataSource = IBatchUploadBaseDataSource & Record<string, any>

export const BatchUpload = (props: IBatchUpload) => {
    const {
        showDefaultColumns: propsShowDefaultColumns = false,
        columns: propsColumns = [],
        editable: propsEditable,
        dataSource: propsDataSource = [],
        isLoading: propsIsLoading
    } = props
    const [fileList, setFileList] = useState<IBatchUploadDataSource[]>(propsDataSource);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const buttonRef = useRef(null) as any;
    const apiUrl = useApiUrl();
    const { access_token: accessToken } = JSON.parse(localStorage.getItem('_authToken') as any || {});
    const { mutate: customMutate } = useCustomMutation();

    const defaultColumn: ColumnsType<IBatchUploadDataSource> = [
        {
            title: "File",
            dataIndex: "file_name",
        },
        {
            title: "Aksi",
            dataIndex: "file_url",
            render: (value, record) => {
                return (
                    <Row gutter={8}>
                        <Col>
                            <Button type="default" onClick={() => handleDownloadFile(record.file_path)}>Download</Button>
                        </Col>
                        {
                            propsEditable && (
                                <Col>
                                    <Button type="default" danger onClick={() => handleDeleteFile(record.file_path)}>
                                        Hapus
                                    </Button>
                                </Col>
                            )
                        }
                    </Row>
                );
            },
        },
    ]

    async function handleUploadFile(files: FileList) {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files.item(i) as File);
        }

        setIsLoading(true);
        customMutate({
            url: `${apiUrl}/files/upload-batch`,
            method: "post",
            values: formData
        }, {
            onSuccess: (resp) => {
                const respFiles = (get(resp.data, "data") || []) as any[];

                if (respFiles.length > 0) {
                    const newFileList: IBatchUploadBaseDataSource[] = [...fileList];
                    for (const [index, file] of Object.entries(respFiles)) {
                        const originFile = files.item(+index)

                        const newFileObj = {
                            file_name: file.file_name,
                            file_path: file.file_path,
                            file_url: URL.createObjectURL(originFile as any)
                        }
                        newFileList.push(newFileObj)
                    }

                    setFileList(newFileList);
                    props?.onFileListChange?.(newFileList);
                    setIsLoading(false);
                }
            },
            onError: (error) => {
                message.error(`Upload batch file failed: ${error.message}`)
            }
        })
    }

    function handleDeleteFile(file_path: string) {
        const newFileList = fileList.filter(file => file?.file_path !== file_path);
        setFileList(newFileList)
        props?.onFileListChange?.(newFileList);
    }

    async function handleDownloadFile(filePath: string) {
        const file = fileList.find(file => file.file_path === filePath) as IBatchUploadDataSource;

        let a = document.createElement("a") as HTMLAnchorElement;
        document.body.appendChild(a);
        a.setAttribute("style", "display: none;")
        a.setAttribute("download", file.file_name);

        if (!file?.file_url) {
            const resp = await axiosInstance.get(
                `${apiUrl}/files/retrieve?file_name=${file.file_name}&file_path=${file.file_path}`,
                {
                    headers: {
                        Authorization: accessToken
                    },
                    responseType: "blob"
                }
            );

            if (resp.data) {
                const objUrl = URL.createObjectURL(resp.data as File);

                a.setAttribute("href", objUrl);
                a.click();
            }
        } else {
            a.setAttribute("href", file.file_url);

            a.click();
        }
    }

    function generateColumn() {
        let column: ColumnsType<any> = [];

        if (propsColumns.length) column = column.concat(...propsColumns);
        if (propsShowDefaultColumns) column = column.concat(...defaultColumn);

        return column
    }

    useEffect(() => {
        setFileList(propsDataSource)
    }, [propsDataSource])

    return (
        <>
            {propsEditable && (
                <Row justify="end" style={{ marginBottom: "1rem" }}>
                    <input
                        ref={buttonRef}
                        id='fileUpload'
                        type='file'
                        multiple
                        style={{ display: "none" }}
                        onChange={(e: any) => {
                            handleUploadFile(e.target?.files)
                        }} />
                    <span
                        style={{ cursor: "pointer", fontWeight: "bold", color: "#1c7ce2" }}
                        onClick={() => buttonRef.current?.click()}
                    >
                        + Tambah
                    </span>
                </Row>
            )}
            <Table
                components={propsEditable ? EditableComponents : {}}
                rowKey={"file_path"}
                rowClassName={() => 'editable-rows'}
                loading={isLoading || propsIsLoading}
                dataSource={fileList}
                columns={generateColumn()}
                pagination={false}
            />
        </>
    );
};
