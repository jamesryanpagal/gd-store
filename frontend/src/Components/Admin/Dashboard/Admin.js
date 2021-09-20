import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NumberFormat from "react-number-format";
import axiosConfig from "../../ReusableFunction/AxiosConfig/AxiosConfig";

//redux actions
import {
  productSalesActions,
  deliveringSalesStatus,
} from "../../../Redux/Actions/sales_Actions";
import {
  addDeliveritem,
  clearResMessage,
} from "../../../Redux/Actions/riders_Actions";

//images
import pendinglogo from "../../PublicImages/pending.png";
import deliveringlogo from "../../PublicImages/delivering.png";
import deliveredlogo from "../../PublicImages/delivered.png";
import incomelogo from "../../PublicImages/income.png";
import emptysales from "../../PublicImages/noProducts.png";

//css
import "./Admin.css";

const RiderList = ({
  setShowRidersList,
  deliverId,
  riders,
  dispatch,
  addDeliveritem,
  deliveringSalesStatus,
}) => {
  const handleSelectRider = (e) => {
    dispatch(addDeliveritem(deliverId, e.target.value));
    dispatch(deliveringSalesStatus("Delivering", deliverId));
    setShowRidersList(false);
  };

  return (
    <div className="rider_list_container">
      <section className="rider_list">
        <section
          className="close_rider_list"
          onClick={() => setShowRidersList(false)}
        >
          <i className="fas fa-times"></i>
        </section>
        <section className="rider_list_text">Select rider</section>
        {riders.length === 0 ? (
          <section className="no_Riders">No Riders !</section>
        ) : (
          riders.map((r) => {
            return (
              <section key={r._id} className="rider_details">
                <section className="rider_name">{r.username}</section>
                <section className="rider_choose_btn">
                  <button
                    type="button"
                    value={r._id}
                    onClick={handleSelectRider}
                  >
                    Choose
                  </button>
                </section>
              </section>
            );
          })
        )}
      </section>
    </div>
  );
};

const RecentList = ({ details, setDeliverId, setShowRidersList }) => {
  const handleAssign = () => {
    setDeliverId(details.sales_id);
    setShowRidersList(true);
  };

  return (
    <tr>
      <td>{details.name}</td>
      <td>{details.email}</td>
      <td>{details.address}</td>
      <td>
        {details.purchased.map((p) => {
          return <section key={p.product_id}>{p.product_name}</section>;
        })}
      </td>
      <td>
        {details.purchased.map((p) => {
          return (
            <section key={p.product_id}>
              <i className="fas fa-dollar-sign"></i>
              {p.product_price}
            </section>
          );
        })}
      </td>
      <td>
        {details.purchased.map((p) => {
          return <section key={p.product_id}>{p.product_quantity}</section>;
        })}
      </td>
      <td>
        {details.purchased.map((p) => {
          return (
            <section key={p.product_id}>
              <i className="fas fa-dollar-sign"></i>
              {p.product_total}
            </section>
          );
        })}
      </td>
      <td>
        <>
          {details.status === "Pending" && (
            <span className="text_pending">{details.status}</span>
          )}
        </>
        <>
          {details.status === "Delivering" && (
            <span className="text_delivering">{details.status}</span>
          )}
        </>
        <>
          {details.status === "Delivered" && (
            <span className="text_delivered">{details.status}</span>
          )}
        </>
      </td>
      <td>
        <button
          className={
            details.status === "Delivered"
              ? "delivered_assign_btn"
              : details.status === "Delivering"
              ? "delivering_assign_btn"
              : "assign_btn"
          }
          type="button"
          onClick={handleAssign}
        >
          {details.status === "Delivered" ? (
            <i className="fas fa-check"></i>
          ) : (
            "Assign"
          )}
        </button>
      </td>
    </tr>
  );
};

const Admin = () => {
  const [showRidersList, setShowRidersList] = useState(false);
  const [deliverId, setDeliverId] = useState("");

  const [totalPending, setTotalPending] = useState(null);
  const [totalDelivering, setTotalDelivering] = useState(null);
  const [totalDelivered, setTotalDelivered] = useState(null);
  const [salesContainer, setSalesContainer] = useState(null);

  const { sales, income } = useSelector((state) => state.Sales);
  const { riders, resMessage } = useSelector((state) => state.Riders);
  const dispatch = useDispatch();

  // Sales Container
  useEffect(() => {
    setSalesContainer([...sales]);
  }, [sales]);

  // Total pending
  useEffect(() => {
    setTotalPending(sales.filter((s) => s.status === "Pending"));
  }, [sales]);

  //Total delivering
  useEffect(() => {
    setTotalDelivering(sales.filter((s) => s.status === "Delivering"));
  }, [sales]);

  //Total delivered
  useEffect(() => {
    setTotalDelivered(sales.filter((s) => s.status === "Delivered"));
  }, [sales]);

  useEffect(() => {
    if (resMessage) {
      setTimeout(() => {
        dispatch(clearResMessage());
      }, 5000);
    }
  }, [resMessage, dispatch]);

  useEffect(() => {
    const getSales = async () => {
      try {
        const { data } = await axiosConfig.get("/sales/getSales");
        data.map((p) => dispatch(productSalesActions(p)));
      } catch (error) {
        console.log(error);
      }
    };
    getSales();
  }, [dispatch]);

  const handleFilterSales = (e) => {
    const target = e.target;
    const filteredSales = sales.filter(
      (s) => s.status === target.children[0].children[0].innerText
    );
    setSalesContainer([...filteredSales]);
  };

  return (
    <div className="adminDashboard_container">
      <section className="rider_list_message">
        {resMessage && (
          <span className="bg-success text-light">{resMessage}</span>
        )}
      </section>
      <section className="dashboard_status_container">
        {/* Pending */}
        <section className="pending" onClick={handleFilterSales}>
          <section className="pending_status_container">
            <p>Pending</p>
            <section className="pending_status">
              <span>{totalPending && totalPending.length}</span>
            </section>
          </section>
          <section className="pending_logo">
            <img src={pendinglogo} alt=" " />
          </section>
        </section>
        {/* Delivering */}
        <section className="delivering" onClick={handleFilterSales}>
          <section className="delivering_status_container">
            <p>Delivering</p>
            <section className="delivering_status">
              <span>{totalDelivering && totalDelivering.length}</span>
            </section>
          </section>
          <section className="delivering_logo">
            <img src={deliveringlogo} alt=" " />
          </section>
        </section>
        {/* Delivered */}
        <section className="delivered" onClick={handleFilterSales}>
          <section className="delivered_status_container">
            <p>Delivered</p>
            <section className="delivered_status">
              <span>{totalDelivered && totalDelivered.length}</span>
            </section>
          </section>
          <section className="delivered_logo">
            <img src={deliveredlogo} alt=" " />
          </section>
        </section>
        {/* Income */}
        <section className="income">
          <section className="income_status_container">
            <p>Income</p>
            <section className="income_status">
              <span>
                <i className="fas fa-dollar-sign"></i>{" "}
                <NumberFormat
                  value={income}
                  thousandSeparator={true}
                  displayType={"text"}
                />
              </span>
            </section>
          </section>
          <section className="income_logo">
            <img src={incomelogo} alt=" " />
          </section>
        </section>
      </section>

      {/* Recent */}

      <section className="recent_container">
        {showRidersList && (
          <RiderList
            setShowRidersList={setShowRidersList}
            deliverId={deliverId}
            riders={riders}
            dispatch={dispatch}
            addDeliveritem={addDeliveritem}
            deliveringSalesStatus={deliveringSalesStatus}
          />
        )}
        <section className="recent_list">
          {salesContainer && salesContainer.length === 0 ? (
            <section className="empty_sales">
              <section className="empty_sales_text">Empty !</section>
              <section className="empty_sales_img">
                <img src={emptysales} alt="" />
              </section>
            </section>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {salesContainer &&
                  salesContainer.map((p) => (
                    <RecentList
                      key={p.sales_id}
                      details={p}
                      setDeliverId={setDeliverId}
                      setShowRidersList={setShowRidersList}
                    />
                  ))}
              </tbody>
            </table>
          )}
        </section>
      </section>
    </div>
  );
};

export default Admin;
