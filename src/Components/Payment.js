import React from 'react'

const Payment = () => {
  return (
    <div>
        <h1>Payment</h1>
        <div>
            <span>
                <label>Card Number</label>
                <input 
                    className='input1'
                    placeholder='0000 0000 0000 000'
                />
            </span>
            <span>
                <label>CVV</label>
                <input 
                    className='input1'
                    placeholder='00/00'
                />
            </span>
        </div>
        <div>

        </div>
    </div>
  )
}

export default Payment