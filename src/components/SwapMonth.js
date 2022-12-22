const SwapMonth = ({monthText, leftChild, rightChild}) => {
    return(
        <div class="SwapMonth">
            <div className="head_btn_left">
                {leftChild}
            </div>
            <div className="monthText">
                {monthText}
            </div>
            <div className="head_btn_right">
                {rightChild}
            </div>
        </div>
    )
}

export default SwapMonth;