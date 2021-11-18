import React from 'react';
import style from "./menu-profile.module.css";
import {NavLink, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {postLogout} from "../../../services/actions/user";

const MenuProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const handleClick = () => {
        dispatch(postLogout(history));
    }
    return (
        <div className={style.profile_cont}>
            <ul className={`${style.profile_menu} mr-15`}>
                <li className={`${style.profile_menu_item} text text_type_main-medium text_color_inactive`}>
                    <NavLink to={`/user-profile`} activeClassName={"text_color_primary"}>Профиль</NavLink>
                </li>
                <li className={`${style.profile_menu_item} text text_type_main-medium text_color_inactive`}>
                    <NavLink to={`/profile/orders`} activeClassName={"text_color_primary"}>История заказов</NavLink>
                </li>
                <li onClick={handleClick}
                    className={`${style.profile_menu_item} text text_type_main-medium text_color_inactive`}>
                    <NavLink exact={true} to={`/login`} activeClassName={"text_color_primary"}>Выход</NavLink>
                </li>
            </ul>
            <p className={`${style.profile_subtitle} mt-20 text text_type_main-default text_color_inactive`}>В этом
                разделе вы можете изменить свои персональные данные</p>
        </div>

    )
}

export default MenuProfile;
