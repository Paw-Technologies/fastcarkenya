import React from 'react'
import { MdShoppingCart, MdAddShoppingCart } from 'react-icons/md'
import { useSelector } from 'react-redux'

const CartBtn = () => {
    let count = useSelector(state=>state.clientSlice.cart)

    let icon = {
      marginTop: 'auto',
      marginBottom: 'auto'
    }
  return (
    <button style={{
        width: '3em',
        height: '2em',
        fontSize: "18px",
        backgroundColor: "transparent",
        marginTop: '0.5em',
        marginBottom: 'auto',
        display: "grid",
        gridAutoFlow: 'column',
        lineHeight: '2em',
        marginLeft: 'auto',
        color: 'white'
    }}>
        { count.length < 1 ? <MdAddShoppingCart style={icon} />: <MdShoppingCart style={icon} />}
        {count.length}
    </button>
  )
}

export default CartBtn
