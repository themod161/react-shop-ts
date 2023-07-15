import { IProduct, IRating } from "../../interfaces/Product";
import { ReactComponent as StarsSVG } from "../../assets/img/stars.svg";
import './Stars.css';

export function Stars({ rate, count }: IRating) {
    return <div className="stars-component">
        <div className="stars-inner">
            <div className="stars-background-1"></div>
            <div className="stars-background-2" style={{width: `${25*(rate || 0)}px`}}></div>
            <StarsSVG />
        </div >
        <div className="stars-count"><span>{count}</span></div>
    </div>
}