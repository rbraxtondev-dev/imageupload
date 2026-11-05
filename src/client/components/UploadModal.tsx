import { Modal, FileInput, Button } from '@mantine/core';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { Group, Text } from '@mantine/core';


import { useState } from 'react';


type UploadModalProps = {
    opened: boolean,
    open: any,
    close: any
};

export default function UploadModal({ opened, open, close }: UploadModalProps) {
    const [value, setValue] = useState<File[]>([]);

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const uploadFiles = async (files: File[]) => {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            let base64Images = []
            if (file) {
                const base64String = await fileToBase64(file);
                base64Images.push(base64String);
                console.log(base64String);
            }
        }
    };

    return (
        <>
            <Modal opened={opened} onClose={close} title="Upload Image">
                {value.map(a => a.name)}
                <Dropzone
                    onDrop={(files) => setValue(files)}
                    onReject={(files) => console.log('rejected files', files)}
                    maxSize={5 * 1024 ** 2}
                    accept={IMAGE_MIME_TYPE}
                >
                    <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                        <Dropzone.Accept>
                            Accept
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                            Reject
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                            Idle
                        </Dropzone.Idle>

                        <div>
                            <Text size="xl" inline>
                                Drag images here or click to select files
                            </Text>
                            <Text size="sm" c="dimmed" inline mt={7}>
                                Attach as many files as you like, each file should not exceed 5mb
                            </Text>
                        </div>
                    </Group>
                </Dropzone>
                <Button onClick={() => uploadFiles(value)}>Hi</Button>
            </Modal>
        </>
    );
}