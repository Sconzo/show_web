import "./style.css";

const Modal = (props: any) => {

    return ((props.trigger) ? (
        <>
            <div className="modal">
                <div className="modal-header">
                    <h3>{props.modalText}</h3>
                    <button 
                        className="btn-closer" 
                        type="button"
                        onClick={() => props.setTrigger(false)}>
                    </button>
                    </div>
                <div className="modal-inner">
                    {props.children}
                </div>
                    
            </div>
        </>
    ) : <></>);
}

export default Modal;