import { Modal, Button } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { Group, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import type { FileRejection } from '@mantine/dropzone';
import { BASE_URL } from "../constants/constants"

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
        // Convert images to base64
        let base64Images = []

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file) {
                const base64String = await fileToBase64(file);
                base64Images.push({ name: file.name, base64: base64String });
            }
        }

        //Upload base64 images
        await fetch(`${BASE_URL}/upload`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ images: base64Images })
        });

        const isMultiple = files.length > 1;
        notifications.show({
            title: 'Upload successful',
            message: isMultiple
                ? `${files.length} images have been uploaded!`
                : `${files.length} image has been uploaded!`
        })

        // Images uploaded. Reload the array of images from the DB, reset the dropzone state, and close the modal.
        getImages();
        setValue([]);
        close();
    };

    const onReject = (files: FileRejection[]) => {
        const isMultiple = files.length > 1 ? true : false;
        notifications.show({
            title: `File${isMultiple ? 's' : ''} not accepted`,
            message: isMultiple
                ? "Please make sure that your files match the size and filetype requirements."
                : "Please make sure that your file matches the size and filetype requirements.",
            color: 'red'
        })
    }


    return (
        <Modal opened={opened} onClose={close} title="Upload Image">
            <Dropzone
                onDrop={(files) => setValue(files)}
                onReject={(files) => onReject(files)}
                maxSize={3 * 1024 ** 2} //3MB
                maxFiles={5}
                accept={IMAGE_MIME_TYPE}
                style={{ marginBottom: 20 }}
            >
                <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                        Drop files to prepare them for upload
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        Please check file type and number of files being uploaded.
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        {value.length} file{value.length > 1 ? "s" : ""} ready for upload
                    </Dropzone.Idle>

                    <div>
                        <Text size="xl" inline>
                            Drag images here or click to select files
                        </Text>
                        <Text size="sm" c="dimmed" inline mt={7}>
                            Attach up to five files, each file should not exceed 3mb
                        </Text>
                    </div>
                </Group>
            </Dropzone>
            <Group justify="flex-end">
                <Button onClick={() => uploadFiles(value)}>Upload</Button>
            </Group>
        </Modal>
    );
}