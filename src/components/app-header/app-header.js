import style from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
export default function Header() {
    return (
        <header className={style.header}>
            <div className={style.container +' pt-4 pb-4 '+ style.header_content}>
                <nav className={style.header_menu}>
                    <ul className={style.header_list}>
                        <li className={style.header_link + ' pr-5 ' + style.header_link_active}>
                            <BurgerIcon type="primary" />
                            <span className="ml-2">Конструктор</span>
                        </li>
                        <li className={"pl-5 ml-2" + style.header_link}>
                            <ListIcon type="secondary" />
                            <span className="ml-2">Лента заказов</span>
                        </li>
                    </ul>
                </nav>
                <div className={style.header_logo}>
                    <Logo />
                </div>
                <div className={style.header_profile }>
                    <ProfileIcon type="secondary" />
                    <span className="ml-2 ">Личный кабинет</span>
                </div>
            </div>
        </header>);
};
