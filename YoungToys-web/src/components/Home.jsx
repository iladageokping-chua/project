// src/components/Home.js
import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import './homestyle.css';

const Home = ({ products, addToCart }) => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <div className="content">
            <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                    <img src="./images/sponsor3.jpg" className="d-block w-100" alt="Banner 1" />
                </Carousel.Item>
                <Carousel.Item>
                    <img src="./images/sponsor2.jpg" className="d-block w-100" alt="Banner 2" />
                </Carousel.Item>
                <Carousel.Item>
                    <img src="./images/sponsor1.jpg" className="d-block w-100" alt="Banner 3" />
                </Carousel.Item>
            </Carousel>

            <div className="col-lg-6 m-auto text-center mt-5">
                <h1 className="h1_color">Categories of The Month</h1>
                <p id="p_color">
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </p>
                <a href="/products" class="btn-link">
                    <button type="button" class="btn btn-style mt-4 px-5 btn-xenon">
                        Buy Now
                    </button>
                </a>
</div>


            
            <div class="mb-5 container">
                <div class="row">
                    <div class="mb-xl-0 mb-5 col-md-4 col-xl-4 text-center">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" viewBox="0 0 16 16" class="bi bi-box-seam mx-auto mb-3">
                                <path d="M.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5V1.5a.5.5 0 0 0-.5-.5h-3zm6 0a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5V1.5a.5.5 0 0 0-.5-.5h-3zm6 0a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5V1.5a.5.5 0 0 0-.5-.5h-3zM.5 7a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6 0a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6 0a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM.5 13a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6 0a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6 0a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
                            </svg>
                            <h2>My Product</h2>
                            <span>สินค้าของเราไม่เพียงแค่สินค้าที่มีคุณภาพ แต่ยังเป็นตัวแทนของความใส่ใจและความพิถีพิถันในการผลิตที่มาพร้อมกับการบริการที่เป็นเอกลักษณ์ที่ทันสมัย เราเชื่อมั่นว่าคุณจะพบความพึงพอใจและความพร้อมที่สูงสุดในการให้บริการเมื่อเลือกซื้อสินค้ากับเรา!</span>
                        </div>
                    </div>
                    <div class="mb-xl-0 mb-5 col-md-4 col-xl-4 text-center">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" viewBox="0 0 16 16" class="bi bi-tools mx-auto mb-3">
                                <path d="M5.5 1a.5.5 0 0 1 .5.5v1.793l3.215 3.214a2.5 2.5 0 0 1 2.307.694l1.793-1.793a.5.5 0 0 1 .853.354v3.5a.5.5 0 0 1-.5.5h-.5a.5.5 0 0 1-.354-.854l-1.793-1.793a2.5 2.5 0 0 1-2.307-.694L6 9.293V12.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h.5a.5.5 0 0 1 .354.854l1.793 1.793a2.5 2.5 0 0 1 2.307.694L9 10.293V5.5a.5.5 0 0 1 .5-.5h1.793l3.214-3.214A.5.5 0 0 1 14 2H13.5a.5.5 0 0 1-.354-.854L11.354.354a.5.5 0 0 0-.708 0L9.146 1.646A.5.5 0 0 1 8.792 2H8.5a.5.5 0 0 1-.5-.5V.5a.5.5 0 0 1 .5-.5h.5z" />
                                <path fill-rule="evenodd" d="M1 4.5A1.5 1.5 0 0 1 2.5 3h2A1.5 1.5 0 0 1 6 4.5V6a.5.5 0 0 1-1 0V4.5a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h2a.5.5 0 0 1 0 1h-2A1.5 1.5 0 0 1 1 11.5v-7z" />
                                <path d="M10.354 2.146a.5.5 0 0 0-.708 0L8.5 3.793 6.854 2.146a.5.5 0 0 0-.708 0l-.5.5a.5.5 0 0 0 0 .708L8.793 6.5 7.146 8.146a.5.5 0 0 0 0 .708l.5.5a.5.5 0 0 0 .708 0L9 7.207l1.646 1.646a.5.5 0 0 0 .708 0l.5-.5a.5.5 0 0 0 0-.708L9.207 6.5 10.854 4.854a.5.5 0 0 0 0-.708l-.5-.5z" />
                            </svg>
                            <h2>Service</h2>
                            <span>เรายินดีให้บริการคุณด้วยความพร้อมและความใส่ใจที่สูงสุดทุกครั้งที่คุณเข้ามาที่ร้านของเรา! ทีมงานของเราพร้อมเสมอที่จะช่วยเสริมสร้างประสบการณ์การซื้อของคุณให้เป็นที่จำได้ด้วยความสุภาพ ความตั้งใจ และความพอใจในบริการที่คุณคาดหวัง อย่างน้อยที่สุด! คุณตั้งสีไหนไว้ พอรันสคริปต์ใหม่สีก็จะเป็นสีที่คุณตั้งไว้ รวมถึงฟังก์ชั่นที่คุณกดไว้ก็เช่นกัน!</span>
                        </div>
                    </div>
                    <div class="mb-xl-0 mb-5 col-md-4 col-xl-4 text-center">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" viewBox="0 0 16 16" class="bi bi-person-hearts mx-auto mb-3">
                                <path fill-rule="evenodd" d="M11.5 1.246c.832-.855 2.913.642 0 2.566-2.913-1.924-.832-3.421 0-2.566ZM9 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h10s1 0 1-1-1-4-6-4-6 3-6 4Zm13.5-8.09c1.387-1.425 4.855 1.07 0 4.277-4.854-3.207-1.387-5.702 0-4.276ZM15 2.165c.555-.57 1.942.428 0 1.711-1.942-1.283-.555-2.281 0-1.71Z"></path>
                            </svg>
                            <h2>Support</h2>
                            <span>ทีม Support ของเราพร้อมให้บริการคุณตลอด 24 ชั่วโมง 7 วันต่อสัปดาห์ เพื่อช่วยแก้ไขปัญหาและตอบข้อสงสัยที่เกิดขึ้น คุณสามารถมั่นใจได้ว่าเราจะอยู่ข้างคุณทุกขั้นตอนของการใช้งาน ด้วยการให้บริการที่ดีเยี่ยมและใส่ใจทุกที่ทุกเวลา</span>
                        </div>
                    </div>
                </div>
            </div>




            <div className="row">
                <div className="col-12 col-md-4 p-5 mt-3">
                    <Link to="/products">
                        <img src="./images/crocodile_biting-removebg-preview.png" className="" alt="Toy" />
                    </Link>
                    <h2 className="h5 text-center mt-3 mb-3 item-title">Toy</h2>
                    <p className="text-center"><Link to="http://localhost/youngtoys_project/show_product.php" className="btn btn-success">Go Shop</Link></p>
                </div>

                <div className="col-12 col-md-4 p-5 mt-3">
                    <Link to="/products">
                        <img src="./images/squishy_star-removebg-preview.png" className="" alt="Doll" />
                    </Link>
                    <h2 className="h5 text-center mt-3 mb-3 item-title">Doll</h2>
                    <p className="text-center"><Link to="http://localhost/youngtoys_project/show_product.php" className="btn btn-success">Go Shop</Link></p>
                </div>

                <div className="col-12 col-md-4 p-5 mt-3">
                    <Link to="/products">
                        <img src="./images/bubble_gun-removebg-preview.png" className="" alt="Gun" />
                    </Link>
                    <h2 className="h5 text-center mt-3 mb-3 item-title">Gun</h2>
                    <p className="text-center"><Link to="http://localhost/youngtoys_project/show_product.php" className="btn btn-success">Go Shop</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Home;
