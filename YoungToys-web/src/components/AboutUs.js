import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import './aboutusstyle.css';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const MyCart = ({ cart, removeFromCart, clearCart, updateCart }) => {
    // Group items in cart by id and sum up their quantities and total prices
    const groupedCart = cart.reduce((acc, item) => {
        const existingItem = acc.find((i) => i.id === item.id);
        if (existingItem) {
            existingItem.quantity += 1;
            existingItem.totalPrice += item.price;
        } else {
            acc.push({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: 1,
                totalPrice: item.price,
                image: item.image, // Add image property
            });
        }
        return acc;
    }, []);

    // Calculate total quantity and total price
    const totalQuantity = cart.length;
    const totalPrice = groupedCart.reduce((total, item) => total + item.totalPrice, 0);

    const handleBuy = () => {
    };

    // Function to handle increase and decrease of quantity
    const handleQuantityChange = (item, change) => {
        if (change === 'increase') {
            const updatedCart = cart.map((cartItem) => {
                if (cartItem.id === item.id) {
                    return { ...cartItem, quantity: cartItem.quantity + 1 };
                }
                return cartItem;
            });
            updateCart(updatedCart);
        } else if (change === 'decrease') {
            const updatedCart = cart.map((cartItem) => {
                if (cartItem.id === item.id && cartItem.quantity > 1) {
                    return { ...cartItem, quantity: cartItem.quantity - 1 };
                }
                return cartItem;
            });
            updateCart(updatedCart);
        }
    };

    return (
        <div className="content">
            
            <div class="about-us-content">
                <h2 id="mycart_style">About Us</h2>
                <h5 id="empty_style">ยินดีต้อนรับสู่ YoungToys!</h5>
                <p id="empty_style">ที่ YoungToys เรามุ่งมั่นที่จะเป็นที่ยอมรับในวงการขายของเล่นและของสะสม โดยเราใส่ใจในการเสนอสินค้าที่มีคุณภาพและความหลากหลาย</p>
                <p id="empty_style">เพื่อให้คุณได้พบกับความสุขในการสร้างความบันเทิงและความทรงจำที่ยิ่งใหญ่ ทุกที่ทุกเวลา เราคัดสรรสินค้าจากแหล่งที่มั่นคงและเชื่อถือได้</p>
                <p id="empty_style">เพื่อให้แน่ใจว่าทุกครั้งที่คุณเลือกที่จะช้อปกับเรา คุณจะได้รับสินค้าที่มีคุณภาพและความพึงพอใจที่สูงสุด</p>
                <p id="empty_style">เรามีความมุ่งมั่นที่จะให้บริการลูกค้าอย่างดีที่สุด ด้วยทีมงานที่มีประสบการณ์และใจบุญที่จะช่วยเหลือคุณในทุกขั้นตอนของการช้อปปิ้ง ไม่ว่าจะเป็นการให้คำแนะนำในการเลือกซื้อ หรือการช่วยเหลือในกระบวนการจัดส่ง</p>
                <p id="empty_style">ที่ YoungToys เราเชื่อว่าความพอใจของคุณคือความสำเร็จของเราด้วย และเรายินดีที่ได้มีส่วนร่วมในการสร้างความสุขให้กับคุณทุกครั้งที่คุณเยี่ยมชมเว็บไซต์ของเราขอบคุณที่เลือกเรา เราหวังว่าคุณจะพบความสุขและความพึงพอใจในการช้อปปิ้งกับเราเสมอ</p>
                <p id="empty_style">ยินดีที่ได้ร่วมทางกับคุณ!</p>
                <p id="empty_style2">YoungToys</p>
            </div>
            <div class="about-us-margin">
            <h5 id="margin">᲼</h5>
            </div>
        </div>

    );
};

export default MyCart;
