import { Input, Group, Button } from '@mantine/core';
import classes from './Navbar.module.css';

type NavbarProps = {
    setSearchTerm: (e: React.ChangeEvent<HTMLInputElement>) => void;
    searchTerm: string;
    openModal: () => void;
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
                    />
                </Group>

                <Group>
                    <Button onClick={openModal}>Upload</Button>
                </Group>
            </div>
        </header>
    );
}