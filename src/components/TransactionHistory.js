import React from "react";

function TranscationHistory({transactions,onDeleteTransaction}){
    return(
        <div>
            <h2>TranscationHistory</h2>
            <ul className='transactions'>
                {
                    transactions.map((data) => 
                    <li key={data.id}>{data.name} ${data.amount} <button onClick={() => onDeleteTransaction(data.id)}>X</button> </li> 
                    )
                }
            </ul>
        </div>
    )
};
export default TranscationHistory;