import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';


type ImageCardProps = {
    image: string
    deleteFn: (imgPath: string) => {}
};
export default function ImageCard({ image, deleteFn }: ImageCardProps) {
    return (
        <Card shadow="sm" padding="lg" withBorder styles={{
            root: {
                width: "100%"
            }
        }}>
            <Card.Section>
                <Image
                    src={`/uploads/${image}`}
                    height={250}
                    alt="Norway"
                />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{image}</Text>
            </Group>

            {/* TODO: are you sure? */}
            <Button color="blue" fullWidth mt="md" onClick={() => { deleteFn(image) }}>
                Delete Image
            </Button>
        </Card>
    );
}