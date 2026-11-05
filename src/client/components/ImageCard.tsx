import { Card, Image, Text, Button, Group } from '@mantine/core';
import { useState, useEffect } from "react";

type ImageCardProps = {
    image: string
    deleteFn: (imgPath: string) => {}
};

export default function ImageCard({ image, deleteFn }: ImageCardProps) {
    // Var for checking if user is sure before deleting. Will reset to false after 1.5s
    const [sureCheck, setSureCheck] = useState(false);

    useEffect(() => {
        if (sureCheck) {
            const timer = setTimeout(() => {
                setSureCheck(false);
            }, 1500); // 1.5 seconds delay

            return () => clearTimeout(timer);
        }
    }, [sureCheck])

    return (
        <Card shadow="sm" padding="lg" withBorder>
            <Card.Section>
                <Image
                    src={`/uploads/${image}`}
                    height={250}
                    alt={image}
                />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{image}</Text>
            </Group>

            {sureCheck ? <Button color="red" fullWidth mt="md" onClick={() => { deleteFn(image) }}>
                Are you sure?
            </Button> : <Button color="blue" fullWidth mt="md" onClick={() => { setSureCheck(true); }}>
                Delete Image
            </Button>}

        </Card>
    );
}