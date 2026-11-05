import { Input, Group, Button } from '@mantine/core';
import classes from './Navbar.module.css';

const links = [
    { link: '/about', label: 'Features' },
    { link: '/pricing', label: 'Pricing' },
    { link: '/learn', label: 'Learn' },
    { link: '/community', label: 'Community' },
];

type NavbarProps = {
    setSearchTerm: (e: React.ChangeEvent<HTMLInputElement>) => void;
    searchTerm: string;
    openModal: any;
};

export default function Navbar({ setSearchTerm, searchTerm, openModal }: NavbarProps) {

    return (
        <header className={classes.header}>
            <div className={classes.inner}>
                <Group>
                    <Input
                        className={classes.search}
                        placeholder="Search images"
                        onChange={(e) => setSearchTerm(e)}
                        value={searchTerm}
                    // leftSection={<IconSearch size={16} stroke={1.5} />}

                    />
                </Group>

                <Group>
                    <Button onClick={openModal}>Upload</Button>
                </Group>
            </div>
        </header>
    );
}