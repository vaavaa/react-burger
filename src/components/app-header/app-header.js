import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container +' pt-4 pb-4 '+ styles.header_content}>
                <nav className={styles.header_menu}>
                    <ul className={styles.header_list}>
                        <li className={styles.header_link + ' pr-5 ' + styles.header_link_active}>
                            <BurgerIcon type="primary" />
                            <span className="ml-2">Конструктор</span>
                        </li>
                        <li className={" pl-5 ml-2 " + styles.header_link}>
                            <ListIcon type="secondary" />
                            <span className="ml-2">Лента заказов</span>
                        </li>
                    </ul>
                </nav>
                <div className={styles.header_logo}>
                    <Logo />
                </div>
                <div className={styles.header_profile }>
                    <ProfileIcon type="secondary" />
                    <span className="ml-2 ">Личный кабинет</span>
                </div>
            </div>
        </header>);
};
