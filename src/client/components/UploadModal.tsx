import { Modal, FileInput, Button } from '@mantine/core';
import { useState } from 'react';


type UploadModalProps = {
    opened: boolean,
    open: any,
    close: any
};

export default function UploadModal({ opened, open, close }: UploadModalProps) {
    const [value, setValue] = useState<File[]>([]);

    return (
        <>
            <Modal opened={opened} onClose={close} title="Upload Image">
                {console.log(value)}
                {value && value.map(a => a.name)}
                <FileInput onChange={setValue} label="Upload files" placeholder="Upload files" multiple />
            </Modal>
        </>
    );
}