import { Modal, FileInput, Button } from '@mantine/core';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { Group, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import type { FileRejection } from '@mantine/dropzone';



import { useState } from 'react';

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};

type UploadModalProps = {
    opened: boolean,
    open: any,
    close: any
    getImages: any
};

export default function UploadModal({ opened, open, close, getImages }: UploadModalProps) {
    const [value, setValue] = useState<File[]>([]);

    const uploadFiles = async (files: File[]) => {
        let base64Images = []

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file) {
                const base64String = await fileToBase64(file);
                base64Images.push({ name: file.name, base64: base64String });
            }
        }

        const url = `http://localhost:3000/upload`;

        await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ images: base64Images })
        });

        notifications.show({
            title: 'Upload successful',
            message: `${files.length} images have been uploaded!`
        })

        getImages();
        setValue([]);
        close();
    };

    const onReject = (files: FileRejection[]) => {
        const multiple = files.length > 1 ? true : false;
        notifications.show({
            title: `File${multiple ? 's' : ''} not accepted`,
            message: multiple
                ? "Please make sure that your files match the size and filetype requirements."
                : "Please make sure that your file matches the size and filetype requirements.",
            color: 'red'
        })
    }


    return (
        <>
            <Modal opened={opened} onClose={close} title="Upload Image">
                <Dropzone
                    onDrop={(files) => setValue(files)}
                    onReject={(files) => onReject(files)}
                    maxSize={10 * 1024 ** 2}
                    accept={IMAGE_MIME_TYPE}
                    style={{ marginBottom: 20 }}
                >
                    <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                        <Dropzone.Accept>
                            Accept
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                            File type not accepted
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                            {value.length} files ready for upload
                        </Dropzone.Idle>

                        <div>
                            <Text size="xl" inline>
                                Drag images here or click to select files
                            </Text>
                            <Text size="sm" c="dimmed" inline mt={7}>
                                Attach as many files as you like, each file should not exceed 10mb
                            </Text>
                        </div>
                    </Group>
                </Dropzone>
                <Group justify="flex-end">
                    <Button onClick={() => uploadFiles(value)}>Upload</Button>
                </Group>
            </Modal>
        </>
    );
}