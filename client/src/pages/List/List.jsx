import React from "react";
import './List.css';
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

function List() {
  const navi=useNavigate();
  return (
    <>
      <Navbar />
      <div id="dum">
        <main>
          <article>
            <section>
              <img src="https://register.codingcontest.org/images/og_image.webp" id="liimg" />
              <div id="sec">
                <img src="https://register.codingcontest.org/images/og_image.webp" id="liimg1"
                />
                <button className="view-more">View More</button>
              </div>
            </section>
            <section>
              <img src="https://www.cityoffircrest.net/wp-content/uploads/2020/09/treasure-hunt-poster.jpg" id="liimg" />
              <div id="sec">
                <img src="https://www.cityoffircrest.net/wp-content/uploads/2020/09/treasure-hunt-poster.jpg" id="liimg1" />
                <button class="view-more">View More</button>
              </div>
            </section>
            <section>
              <img src="https://www.gla.ac.in/Uploads/largeImages/759evlg_CodingCpmp-1.jpg" id="liimg" />
              <div id="sec">
                <img src="https://www.gla.ac.in/Uploads/largeImages/759evlg_CodingCpmp-1.jpg" id="liimg1" />
                <button class="view-more">View More</button>
              </div>
            </section>
            <section>
              <img src="https://marmof.com/storage/1561/S4qVfORqC6voHAjKUitH2bYHBfm1MS-metaVGhlIEFydCBvZiBQcm9tcHQgRW5naW5lZXJpbmcgKDEpLmpwZw==-.jpg" id="liimg" />
              <div id="sec">
                <img src="https://marmof.com/storage/1561/S4qVfORqC6voHAjKUitH2bYHBfm1MS-metaVGhlIEFydCBvZiBQcm9tcHQgRW5naW5lZXJpbmcgKDEpLmpwZw==-.jpg" id="liimg1" />
                <button class="view-more">View More</button>
              </div>
            </section>
            <section id="last">
            <img src="https://www.pngmart.com/files/22/Black-Background-PNG-Photo.png" id="liimg" />
              <div id="sec">
                <button id="ex" onClick={()=>{navi('../event')}}>Explore More</button>
              </div>
            </section>
          </article>
        </main>
      </div>
    </>
  );

}

export default List;