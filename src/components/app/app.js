import style from './app.module.css';
import Header from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {data_list} from '../../utils/data.js';


function App() {
    const ids = [4, 6, 8, 6, 7, 8, 12, 13];
    return (
        <div className={style.wrapper}>
            <Header/>
            <div className={style.container}>
                <main className={style.content_body}>
                    <BurgerIngredients data={data_list} />
                    <BurgerConstructor data={data_list} ids={ids}/>
                </main>
            </div>
        </div>
    );
}

export default App;
