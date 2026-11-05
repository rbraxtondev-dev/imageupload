import { Input, Burger, Divider, Drawer, Group, ScrollArea, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Navbar.module.css';

const links = [
    { link: '/about', label: 'Features' },
    { link: '/pricing', label: 'Pricing' },
    { link: '/learn', label: 'Learn' },
    { link: '/community', label: 'Community' },
];

export default function Navbar({ setSearchTerm }) {
    const [opened, { toggle, close }] = useDisclosure(false);

    const items = links.map((link) => (
        <a
            key={link.label}
            href={link.link}
            className={classes.link}
            onClick={(event) => event.preventDefault()}
        >
            {link.label}
        </a>
    ));

    return (
        <header className={classes.header}>
            <div className={classes.inner}>
                <Group>
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        size="sm"
                        hiddenFrom="sm"
                        aria-label="Toggle navigation"
                    />
                    <Input
                        className={classes.search}
                        placeholder="Search"
                        onChange={(e) => setSearchTerm(e)}
                        // leftSection={<IconSearch size={16} stroke={1.5} />}
                        visibleFrom="xs"
                    />
                </Group>

                <Group>
                    <Button>Upload</Button>
                </Group>
            </div>

            <Drawer
                opened={opened}
                onClose={close}
                size="100%"
                padding="md"
                title="Navigation"
                hiddenFrom="sm"
                zIndex={1000000}
            >
                <ScrollArea h="calc(100vh - 80px" mx="-md">
                    <Divider my="sm" />
                    <Input
                        placeholder="Search"
                        // leftSection={<IconSearch size={16} stroke={1.5} />}
                        data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
                        mx="md"
                        mb="sm"
                    />
                    {items}
                </ScrollArea>
            </Drawer>
        </header>
    );
}