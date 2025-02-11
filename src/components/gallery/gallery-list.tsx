import { EditableComponents } from '@/components/table/editable';
import { axiosInstance, useFileTranslate } from '@/utility';
import { useApi } from '@/hooks/useApi';
import { useApiUrl, useCustom, useMany } from '@refinedev/core';
import { Button, Col, Image, Row, Space, Table } from 'antd';
import { useEffect, useState } from 'react';

export type GalleryItem = Partial<{
  key: string | number,
  file_name: string,
  file_path: string,
  description: string,
  src: any,
}>;

export type GalleryListProps = Partial<{
  editable: boolean,
  dataSource: GalleryItem[],
  onChangeDescription: (key: string, value: string) => void,
  onDeleteGallery: (record: any) => boolean | Promise<boolean>,
  onOpenAddModal: () => void
}>;

export const GalleryList = (props: GalleryListProps) => {
  const common = useFileTranslate('common');

  const [images, setImages] = useState<GalleryItem[]>(props?.dataSource || []);
  const apiUrl = useApiUrl();

  const { access_token: accessToken } = JSON.parse(localStorage.getItem('_authToken') as any || {});

  useEffect(() => {
    // Fetch image URLs when component mounts or when dataSource changes
    if (props?.dataSource && props.dataSource.length > 0) {
      const fetchImages = async () => {
        const updatedImages = await Promise.all((props?.dataSource || []).map(async (file) => {
          const imgUrl = `/files/retrieve?file_name=${file?.file_name}&file_path=${file?.file_path}`;

          // const { data } = useCustom({
          //   url: apiUrl + imgUrl,
          //   method: 'get',
          //   config: {
          //     headers: {
          //       Authorization: `Bearer ${accessToken}`,
          //     },
          //   },
          // });
          // const imgSrc = URL.createObjectURL(data as any);

          // const response = await fetch(
          //   apiUrl + imgUrl,
          //   {

          //     headers: {
          //       Authorization: `Bearer ${accessToken}`,
          //     },
          //   }
          // );

          // if (!response.ok) {
          //   throw new Error('Failed to fetch image');
          // }
          // const data = await response.blob();
          // const imgSrc = URL.createObjectURL(data);

          // await sendRequest(
          //   imgUrl,
          //   'get',
          //   null,
          //   {
          //     headers: {
          //       Authorization: `Bearer ${accessToken}`,
          //     },
          //     responseType: 'blob',
          //   }
          // );

          // TODO: sementara pakai axios karena belum tau metode lain
          const response = await axiosInstance({
            url: apiUrl + imgUrl,
            method: 'get',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            responseType: 'arraybuffer',
          });

          // Function to convert array buffer to base64
          const arrayBufferToBase64 = (buffer: any) => {
            let binary = '';
            const bytes = new Uint8Array(buffer);
            const len = bytes.byteLength;
            for (let i = 0; i < len; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            return window.btoa(binary);
          };
          const base64Image = arrayBufferToBase64(response.data);
          const imgSrc = `data:${response.headers['content-type']};base64,${base64Image}`;

          return { ...file, src: imgSrc };
        }));
        setImages(updatedImages);
      };

      fetchImages();
    }
  }, [props.dataSource]);

  const columns: any[] = [
    {
      title: common('gallery_list.photo'),
      dataIndex: 'file_path',
      render: (_: any, record: any) => {
        return <Image width={96} src={record?.src} />;
      }
    },
    {
      title: common('gallery_list.file'),
      dataIndex: 'file_name',
    },
    {
      title: common('gallery_list.description'),
      dataIndex: 'description',
      onCell: (record: any) => ({
        record,
        title: common('gallery_list.description'),
        dataIndex: 'description',
        editable: true,
        handleSave: handleDescriptionEdit
      })
    },
  ];
  if (props.onDeleteGallery) {
    columns.push(
      {
        render: (_: any, record: any) => {
          return (
            <Space size={4}>
              <Button danger onClick={() => handleDeleteGallery(record)}>{common('gallery_list.delete')}</Button>
            </Space>
          );
        }
      }
    );
  }

  function handleDeleteGallery(record: any) {
    props.onDeleteGallery?.(record);
  }

  function handleDescriptionEdit(text: string, record: any) {
    props.onChangeDescription?.(
      record.file_name,
      text,
    );
  }

  return (
    <div className="gallery-list">
      {props.editable && (
        <Row justify="end">
          <Button type="link" onClick={() => props.onOpenAddModal?.()}>
            <span style={{ cursor: 'pointer', fontWeight: 'bold', color: '#1c7ce2' }}> + {common('gallery_list.choose_photo')}</span>
          </Button>
        </Row>
      )}
      <Row>
        <Col span={24}>
          <Table
            components={props.editable ? EditableComponents : {}}
            rowClassName={() => 'editable-row'}
            columns={columns}
            dataSource={Array.isArray(images) && images.length > 0 ? images : []}
          />
        </Col>
      </Row>
    </div>
  );
};
