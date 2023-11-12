import CopyLink from './components/copy-link/copy-link';
import Merge from './components/merge/merge';
import CanvasElementSelector from './components/select-element/select-element';
import './multi-step.css';

export default function MultiStep() {


    return (

        <div className="container">
            <section className="row-container">
                <div className="step">
                    1
                </div>
                <div className="row-container__inner">
                    <CanvasElementSelector></CanvasElementSelector>
                </div>
            </section>

            <section className="row-container">
                <div className="step">
                    2
                </div>
                <div className="row-container__inner">
                    <Merge></Merge>

                </div>
            </section>
            <section className="row-container">
                <div className="step">
                    3
                </div>
                <div className="row-container__inner">
                    <CopyLink></CopyLink>

                </div>
            </section>
            

        </div>
    )
}