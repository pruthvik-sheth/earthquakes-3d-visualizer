import { useDispatch, useSelector } from "react-redux"
import { setCurrent } from "../redux/slices/earthquakeSlice"

const Header = () => {

    const dispatch = useDispatch()

    const { current } = useSelector((state) => state.earthquakes)

    const styleHighlighted = {
        backgroundColor: '#ffffff',
        color: '#000000'
    }
    const styleNormal = {
        color: '#ffffff'
    }

    return (
        <header>
            <nav>
                <div className="container">

                    <div className="logo">
                        Earthly.viz
                    </div>

                    <div className="nav_items">
                        <button style={current == 'PASTHOUR' ? styleHighlighted : styleNormal} onClick={() => { dispatch(setCurrent('PASTHOUR')) }} className="nav_item nav_btn">Past Hour</button>
                        <button style={current == 'PASTDAY' ? styleHighlighted : styleNormal} onClick={() => { dispatch(setCurrent('PASTDAY')) }} className="nav_item nav_btn">Past day</button>
                        <button style={current == 'PAST7DAYS' ? styleHighlighted : styleNormal} onClick={() => { dispatch(setCurrent('PAST7DAYS')) }} className="nav_item nav_btn">Past 7 days</button>
                        <button style={current == 'PAST30DAYS' ? styleHighlighted : styleNormal} onClick={() => { dispatch(setCurrent('PAST30DAYS')) }} className="nav_item nav_btn">Past 30 days</button>
                    </div>

                </div>
            </nav>
        </header>
    )
}

export default Header