import { useFileTranslate } from '@/utility';
import { Button, Row, Space, Upload, type UploadFile as BaseUploadFile } from 'antd';
import { useState } from 'react';

export type UploadFile = BaseUploadFile<any> & { file: any };

export type GalleryPickerModalProps = Partial<{
  onCancel: () => void,
  onSave: (files: UploadFile[]) => void
}>;

export const GalleryPickerModal = (props: GalleryPickerModalProps) => {
  const common = useFileTranslate('common');
  const [files, setFiles] = useState<UploadFile[]>([]);

  function handleSave() {
    props.onSave?.(files);
  }

  return (
    <div className="gallery-picker-modal">
      <Row>
        <Upload
          multiple
          accept="image/*"
          listType="picture-card"
          onRemove={(file) => {
            setFiles(prev => {
              const index = prev.findIndex(val => val.uid === file.uid);
              if (index >= 0) prev.splice(index, 1);
              return prev;
            });
            return Promise.resolve(true);
          }}
          beforeUpload={(file) => {
            setFiles(prev => {
              prev.push({
                file,
                uid: file.uid,
                name: file.name,
                status: 'done',
                url: URL.createObjectURL(file)
              });
              return prev;
            });
            return false;
          }}
        >
          {common('gallery_list.choose_photo')}
        </Upload>
      </Row>
      <Row justify="end" style={{ marginTop: '.5rem' }}>
        <Space>
          <Button onClick={props.onCancel} type="primary" danger>{common('gallery_list.cancel')}</Button>
          <Button onClick={handleSave} type="primary">{common('gallery_list.save')}</Button>
        </Space>
      </Row>
    </div>
  );
};
