const stripe = require("stripe")(process.env.STRIPE_TEST_KEY);
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const productsCheckout = async (req, res) => {
  const { CheckoutProducts } = req.body;
  try {
    const stripeCheckout = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: CheckoutProducts.map((products) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: products.product_name,
              images: [products.product_image],
            },
            unit_amount: products.product_price * 100,
          },
          quantity: products.product_quantity,
        };
      }),
      success_url: "https://gd-store-mern.herokuapp.com/checkoutsuccess",
      cancel_url: "https://gd-store-mern.herokuapp.com/checkoutcancel",
    });
    res.json(stripeCheckout.url);
  } catch (error) {
    res.json(error.message);
  }
};

const productCheckout = async (req, res) => {
  const checkoutProduct = req.body;
  try {
    const stripeProductCheckout = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: checkoutProduct.product_name,
              images: [checkoutProduct.product_image],
            },
            unit_amount: checkoutProduct.product_price * 100,
          },
          quantity: 1,
        },
      ],
      success_url:
        "https://gd-store-mern.herokuapp.com/checkoutsuccessproduct/" +
        checkoutProduct._id,
      cancel_url: "https://gd-store-mern.herokuapp.com/checkoutcancel",
    });
    res.json(stripeProductCheckout.url);
  } catch (error) {
    res.json(error.message);
  }
};

const sendProductEmail = async (req, res) => {
  const { name, email, date, product } = req.body;
  try {
    // create message
    const msg = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Purchase receipt",
      text: "Thank you for trusting Pag's Gadget Store",
      html: `
            <section style="border: #afafaf 1px solid; min-height: 550px; width: 300px; background-color: white; margin: auto; font-family: Arial, Helvetica, sans-serif; padding: 10px; border-radius: 3px">

      	<section style="text-align: center; padding: 20px; font-size: 20px; font-weight: bolder; color: #db00ff">
          	<span>Pag's</span>
          </section>

          <section style="background: #626262; padding: 10px; border-radius: 3px; text-align: center; color: white">
          	<span>Purchase Receipt</span>
          </section>

          <section style="padding: 20px 5px 0 5px;">
          	<section>Recipient Details</section>
          </section>

          <section style="background: #d2d2d2; margin-top: 2px; padding: 5px; border-radius: 3px">
          	<section>Date:</section>
              <section>${date}</section>
          </section>

          <section style="background: #d2d2d2; margin-top: 2px; padding: 5px; border-radius: 3px">
          	<section>Name:</section>
              <section>${name}</section>
          </section>

          <section style="background: #d2d2d2; margin-top: 2px; padding: 5px; border-radius: 3px">
          	<section>Email:</section>
              <section>${email}</section>
          </section>

          <section style="padding: 20px 5px 0 5px;">
          	<section>Order Details</section>
          </section>

          <table style="width: 100%; margin-top: 2px">
          	<thead>
              	<tr style="background: #626262; color: #ffffff">
                  	<th style="padding: 5px">Product</th>
                  	<th style="padding: 5px">Price</th>
                  	<th style="padding: 5px">Quantity</th>
                  	<th style="padding: 5px">Total</th>
                  </tr>
              </thead>
              <tbody>
                    <tr style="text-align: center; background: #d2d2d2;">
                  	<td style="width: 120px; padding: 5px; word-break: break-all">${
                      product.product_name
                    }</td>
                  	<td style="padding: 5px">${product.product_price
                      .toString()
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</td>
                  	<td style="padding: 5px">1</td>
                  	<td style="padding: 5px">${product.product_price
                      .toString()
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</td>
                  </tr>
              </tbody>
          </table>

          <section style="background: #626262; padding: 5px; color: #ffffff; margin-top: 10px; text-align: end; border-radius: 3px">
          	<span>
              	Total:
              </span>
              <span>
              	$${product.product_price
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
              </span>
          </section>

      </section>
            `,
    };

    // send email
    transporter.sendMail(msg, (err, info) => {
      if (err) {
        res.json(err);
        return;
      }
      res.json(true);
    });
  } catch (error) {
    res.json(error.message);
  }
};

const sendProductsEmail = async (req, res) => {
  const { cart, total, date, name, email } = req.body;
  try {
    // create message
    const msg = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Purchase receipt",
      text: "Thank you for trusting Pag's Gadget Store",
      html: `
      <section style="border: #afafaf 1px solid; min-height: 550px; width: 300px; background-color: white; margin: auto; font-family: Arial, Helvetica, sans-serif; padding: 10px; border-radius: 3px">

	<section style="text-align: center; padding: 20px; font-size: 20px; font-weight: bolder; color: #db00ff">
    	<span>Pag's</span>
    </section>
    
    <section style="background: #626262; padding: 10px; border-radius: 3px; text-align: center; color: white">
    	<span>Purchase Receipt</span>
    </section>
    
    <section style="padding: 20px 5px 0 5px;">
    	<section>Recipient Details</section>
    </section>
    
    <section style="background: #d2d2d2; margin-top: 2px; padding: 5px; border-radius: 3px">
    	<section>Date:</section>
        <section>${date}</section>
    </section>
    
    <section style="background: #d2d2d2; margin-top: 2px; padding: 5px; border-radius: 3px">
    	<section>Name:</section>
        <section>${name}</section>
    </section>
    
    <section style="background: #d2d2d2; margin-top: 2px; padding: 5px; border-radius: 3px">
    	<section>Email:</section>
        <section>${email}</section>
    </section>
    
    <section style="padding: 20px 5px 0 5px;">
    	<section>Order Details</section>
    </section>
    
    <table style="width: 100%; margin-top: 2px">
    	<thead>
        	<tr style="background: #626262; color: #ffffff">
            	<th style="padding: 5px">Product</th>
            	<th style="padding: 5px">Price</th>
            	<th style="padding: 5px">Quantity</th>
            	<th style="padding: 5px">Total</th>
            </tr>
        </thead>
        <tbody>
        	${cart
            .map((p) => {
              return `
              <tr style="text-align: center; background: #d2d2d2;">
            	<td style="width: 120px; padding: 5px; word-break: break-all">${
                p.product_name
              }</td>
            	<td style="padding: 5px">${p.product_price
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</td>
            	<td style="padding: 5px">${p.product_quantity}</td>
            	<td style="padding: 5px">${p.product_total
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</td>
            </tr>
              `;
            })
            .join("")}
        </tbody>
    </table>
    
    <section style="background: #626262; padding: 5px; color: #ffffff; margin-top: 10px; text-align: end; border-radius: 3px">
    	<span>
        	Total:
        </span>
        <span>
        	$${total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
        </span>
    </section>
    
    
</section>
      `,
    };

    // send email
    transporter.sendMail(msg, (err, info) => {
      if (err) {
        res.json(err);
        return;
      }
      res.json(true);
    });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  productsCheckout,
  productCheckout,
  sendProductsEmail,
  sendProductEmail,
};
