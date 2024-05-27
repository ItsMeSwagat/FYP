import React from "react";
import Accordion from "./Accordion";

const Faq = () => {
  return (
    <>
      <div className=" px-[1rem] md:px-[2rem] xl:px-[8rem] py-[2rem] grid gap-10">
        <h1 className="text-3xl md:text-5xl xl:text-6xl font-bold">FAQ</h1>
        <div className=" grid gap-3 p-4 bg-white rounded-lg">
          <Accordion
            title="1. What types of sarees do you offer at Jass Saree?"
            answer="At Jass Saree, we offer a wide variety of sarees, including traditional Kanjeevarams, Banarasis, Chanderis, Maheshwaris, and contemporary designs. Our collection features sarees made from pure silk, cotton, and blended fabrics to cater to different tastes and occasions."
          />
          <Accordion
            title="2. How can I place an order online?"
            answer="Placing an order online is simple. Visit our website, browse through our collection, select the saree you like, and add it to your cart. Proceed to checkout, where you can fill in your shipping details and make a secure payment. You will receive an order confirmation via email."
          />
          <Accordion
            title="3. Do you offer customization or bespoke services?"
            answer="Yes, we offer customization services for our sarees. If you have specific design preferences or require alterations, please contact our customer service team. We will work closely with you to create a saree that meets your requirements."
          />
          <Accordion
            title="4. What is your return and exchange policy?"
            answer="We accept returns and exchanges within 14 days of delivery, provided the saree is in its original condition, unworn, and with all tags intact. Please contact our customer service team to initiate a return or exchange. Customized sarees, however, are non-returnable."
          />
          <Accordion
            title="5. How do I take care of my saree?"
            answer="To maintain the beauty and longevity of your saree, we recommend dry cleaning for silk sarees and gentle hand washing for cotton sarees. Store your saree in a cool, dry place, preferably wrapped in a muslin cloth to protect it from moisture and dust."
          />
          <Accordion
            title="6. What payment methods do you accept?"
            answer="We accept various payment methods, including credit and debit cards, net banking, and digital wallets. All transactions on our website are secure, ensuring a safe shopping experience for our customers."
          />
          <Accordion
            title="7. Do you have a physical store I can visit?"
            answer="Yes, we have a physical store where you can experience our saree collection firsthand. Visit our store at [insert store address] during our business hours. Our friendly staff will be delighted to assist you in finding the perfect saree."
          />
        </div>
      </div>
    </>
  );
};

export default Faq;
