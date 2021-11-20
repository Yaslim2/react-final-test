import { useHistory } from "react-router";
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from "react-redux";
import MainButton from "@UI/MainButton";
import { userActions } from "@store/userSlice";
import { cartActions } from "@store/cartSlice";
import { Game } from "@store/userSlice/types";
import { RootState } from "@store/index";
import { convertToReal } from '@auxiliarFunctions/index'
import { gameActions } from "@store/gameSlice";
import Card from "@UI/Card";
import CartItem from "../CartItem";
import emptyCartSvg from '@assets/img/empty-cart.png';
import {
    CartItemsArea, EmptyCartText, EmptyCartArea,
    EmptyCartImg, CartArea, ContainerCart,
    CartTitleText, TotalCartPrice,
    TotalCartText, AreaButtonSave
} from './styles'

const Cart: React.FC = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { clearCart } = cartActions
    const { resetGame, clearGame } = gameActions
    const { saveGame } = userActions;
    const minValue = useSelector((state: RootState) => state.game.minValue)
    const items = useSelector((state: RootState) => state.cart.items);
    const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
    const cartItems = items.map((item) => <CartItem mainColor={item.mainColor} id={item.id} key={item.id} balls={item.numbers} gamePrice={convertToReal(item.gamePrice)} gameType={item.gameType} />)
    const handleSaveGame = () => {
        if (totalPrice < minValue) {
            toast.warn(`The minimum stake is R$ ${convertToReal(minValue)}.`);
            return;
        }
        const gameItems: Game[] = items.map((item) => {
            return {
                numbersSelected: item.numbers,
                date: new Date().toLocaleDateString('pt-BR'),
                price: item.gamePrice,
                type: item.gameType,
                color: item.mainColor
            }
        })
        dispatch(saveGame({ games: gameItems }));
        dispatch(clearCart());
        dispatch(clearGame());
        dispatch(resetGame());
        history.push('/user/recent-games');
    }
    const emptyCart =
        <EmptyCartArea>
            <EmptyCartImg src={emptyCartSvg} alt="" />
            <EmptyCartText>No items in your cart...</EmptyCartText>
            <EmptyCartText>Add an item!</EmptyCartText>
        </EmptyCartArea>
    return (
        <CartArea>
            <Card>
                <ContainerCart>
                    <CartTitleText>CART</CartTitleText>

                    {cartItems.length === 0 ? emptyCart : <CartItemsArea>{cartItems}</CartItemsArea>}
                    <TotalCartText>CART <TotalCartPrice>TOTAL: R$: {convertToReal(totalPrice)}</TotalCartPrice></TotalCartText>
                    {cartItems.length !== 0 ? (
                        <AreaButtonSave>
                            <MainButton onSave={handleSaveGame}>Save</MainButton>
                        </AreaButtonSave>
                    ) : null}
                </ContainerCart>
            </Card>
        </CartArea>
    )
}

export default Cart;