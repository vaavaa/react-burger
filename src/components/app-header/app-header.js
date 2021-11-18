import style from './app-header.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {NavLink, useRouteMatch} from "react-router-dom";
import {useSelector} from "react-redux";

const Header = () => {
    const {isAuth} = useSelector(state => state.userData);
    const isLogin = !!useRouteMatch('/login');
    const isProfile = !!useRouteMatch('/user-profile');
    const isConstructor = !!useRouteMatch({path: '/', exact: true});
    const isIngredient = !!useRouteMatch({path: '/ingredients/:id'});
    const isOrders = !!useRouteMatch({path: '/profile/orders'});

    console.log (isConstructor);
    return (
        <header className={style.header}>
            <div className={style.container + ' pt-4 pb-4 ' + style.header_content}>
                <nav className={style.header_menu}>
                    <ul className={style.header_list}>
                        <li>
                            <NavLink exact={true} to={"/"} className={style.header_link + ' pr-5 ' + ((isConstructor || isIngredient) ? style.header_link_active : '')}>
                                <BurgerIcon type={(isConstructor || isIngredient) ? "primary" : "secondary"}/>
                                <span className="ml-2">Конструктор</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/profile/orders"} className={style.header_link + ' pr-5 ' + ((isOrders) ? style.header_link_active : '')}>
                                <ListIcon type={isOrders ? "primary" : "secondary"}/><span className="ml-2">Лента заказов</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <div className={style.header_logo}>
                    <Logo/>
                </div>
                <div className={style.header_profile}>
                    {isAuth ? (
                        <NavLink to={"/user-profile"}
                                 className={style.header_link + ' pr-5 ' + (isProfile ? style.header_link_active : '')}>
                            <ProfileIcon type={isProfile ? "primary" : "secondary"}/><span>Профиль</span>
                        </NavLink>
                    ) : (<NavLink to={"/login"}
                                  className={style.header_link + ' pr-5 ' + (isLogin ? style.header_link_active : '')}>
                        <ProfileIcon type={isLogin ? "primary" : "secondary"}/>
                        <span className="ml-2 ">Личный кабинет</span>
                    </NavLink>)}
                </div>
            </div>
        </header>);
};
export default Header;
