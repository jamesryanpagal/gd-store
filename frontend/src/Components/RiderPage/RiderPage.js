import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import axiosConfig from "../ReusableFunction/AxiosConfig/AxiosConfig";

//redux actions
import { removeUserTokenActions } from "../../Redux/Actions/user_Actions";
import {
  removeDeliverItem,
  ridersActions,
} from "../../Redux/Actions/riders_Actions";
import {
  deliveredSalesStatus,
  cancelSalesStatus,
} from "../../Redux/Actions/sales_Actions";

//functions
import verifyToken from "../ReusableFunction/VerifyToken/Verify_Token";

//css
import "./RiderPage.css";

const ConfirmDelivered = ({
  setShowConfirmDelivered,
  delivered_Id,
  riderId,
  dispatch,
}) => {
  const handleDeliveredItem = () => {
    dispatch(deliveredSalesStatus("Delivered", delivered_Id));
    dispatch(removeDeliverItem(delivered_Id, riderId));
    setShowConfirmDelivered(false);
  };

  return (
    <div className="confirm_delivered_container">
      <section className="confirm_delivered">
        <section className="confirm_delivered_text">
          Please confirm if you delivered the item
        </section>
        <section className="confirm_delivered_btn">
          <button
            className="proceed_confirm"
            type="button"
            onClick={handleDeliveredItem}
          >
            Confirm
          </button>
          <button
            className="exit_confirm"
            type="button"
            onClick={() => setShowConfirmDelivered(false)}
          >
            Back
          </button>
        </section>
      </section>
    </div>
  );
};

const CancelDelivered = ({
  setShowConfirmCancelDeliver,
  delivered_Id,
  riderId,
  dispatch,
}) => {
  const handleCancelItem = () => {
    dispatch(cancelSalesStatus(delivered_Id));
    dispatch(removeDeliverItem(delivered_Id, riderId));
    setShowConfirmCancelDeliver(false);
  };

  return (
    <div className="confirm_delivered_container">
      <section className="confirm_delivered">
        <section className="confirm_delivered_text">
          Are you sure you want to cancel to deliver this item ?
        </section>
        <section className="confirm_delivered_btn">
          <button
            className="proceed_confirm"
            type="button"
            onClick={handleCancelItem}
          >
            Yes
          </button>
          <button
            className="exit_confirm"
            type="button"
            onClick={() => setShowConfirmCancelDeliver(false)}
          >
            Back
          </button>
        </section>
      </section>
    </div>
  );
};

const RiderPage = () => {
  const [riderId, setRiderId] = useState("");
  const [riderDetails, setRiderDetails] = useState(null);
  const [showItems, setShowItems] = useState(false);

  const [showConfirmDelivered, setShowConfirmDelivered] = useState(false);
  const [showConfirmCancelDeliver, setShowConfirmCancelDeliver] =
    useState(false);
  const [delivered_Id, setDelivered_Id] = useState("");

  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.User);
  const { riders } = useSelector((state) => state.Riders);
  const { sales } = useSelector((state) => state.Sales);

  // get rider details

  useEffect(() => {
    const getUser = async () => {
      const { data } = await verifyToken(userToken);
      setRiderId(data._id);
    };

    getUser();

    return () => {
      setRiderId("");
    };
  }, [userToken]);

  //Get all riders from database

  useEffect(() => {
    const get_riders = async () => {
      const { data } = await axiosConfig.get("/riders/getRiders");
      const filter_rider = await data.filter((r) => r.user_type === "Rider");
      filter_rider.map((r) => dispatch(ridersActions(r)));
    };
    get_riders();
  }, [dispatch]);

  useEffect(() => {
    if (riderId) {
      if (riders) {
        setRiderDetails({ ...riders.find((r) => r._id === riderId) });
      }
    }
  }, [riders, riderId]);

  const handleRiderLogout = () => {
    dispatch(removeUserTokenActions());
  };

  const handleConfirmDelivered = (e) => {
    const deliveredId = e.target.children[0].innerText;
    setShowConfirmDelivered(true);
    setDelivered_Id(deliveredId);
  };

  const handleCancelItem = (e) => {
    const deliveredId = e.target.children[0].innerText;
    setShowConfirmCancelDeliver(true);
    setDelivered_Id(deliveredId);
  };

  return (
    <div className="rider_page_container">
      {showConfirmDelivered && (
        <ConfirmDelivered
          setShowConfirmDelivered={setShowConfirmDelivered}
          delivered_Id={delivered_Id}
          riderId={riderId}
          dispatch={dispatch}
        />
      )}
      {showConfirmCancelDeliver && (
        <CancelDelivered
          setShowConfirmCancelDeliver={setShowConfirmCancelDeliver}
          delivered_Id={delivered_Id}
          riderId={riderId}
          dispatch={dispatch}
        />
      )}
      <section className="deliver_list">
        <section className="rider_logout">
          <button
            className="rider_show_items"
            type="button"
            onClick={() => setShowItems((prev) => !prev)}
          >
            Show all items
          </button>
          <button
            className="rider_logout_btn"
            type="button"
            onClick={handleRiderLogout}
          >
            Logout
          </button>
        </section>
        <section className="deliver_list_text">Deliver list</section>
        {riderDetails && (
          <>
            <>
              {riderDetails.deliverItem.length === 0 && (
                <section className="no_item">No item !</section>
              )}
            </>
            <>
              {riderDetails.deliverItem.length !== 0 &&
                riderDetails.deliverItem.map((i) => {
                  const deliverItem = sales.find(
                    (salesItem) => salesItem.sales_id === i
                  );
                  return (
                    <section
                      key={uuidv4()}
                      className="deliver_list_details_container"
                    >
                      <section className="deliver_list_details">
                        <section className="deliver_list_name">
                          Name:
                          <span> {deliverItem.name}</span>
                        </section>
                        <section className="deliver_list_address">
                          Address:
                          <span> {deliverItem.address}</span>
                        </section>
                        <section className="items">
                          <section className="items_text">
                            Items{" "}
                            {showItems ? (
                              <i className="fas fa-chevron-up"></i>
                            ) : (
                              <i className="fas fa-chevron-down"></i>
                            )}
                          </section>
                          {showItems &&
                            deliverItem.purchased.map((purchasedItem) => {
                              return (
                                <section
                                  key={uuidv4()}
                                  className="purchase_items"
                                >
                                  <span>{purchasedItem.product_name}</span>
                                  <span>
                                    Qty: {purchasedItem.product_quantity}
                                  </span>
                                </section>
                              );
                            })}
                        </section>
                      </section>
                      <section className="deliver_list_action">
                        <section
                          className="item_delivered"
                          onClick={handleConfirmDelivered}
                        >
                          <span>{deliverItem.sales_id}</span>
                          <i className="fas fa-check"></i>
                        </section>
                        <section
                          className="item_cancel"
                          onClick={handleCancelItem}
                        >
                          <span>{deliverItem.sales_id}</span>
                          <i className="fas fa-times"></i>
                        </section>
                      </section>
                    </section>
                  );
                })}
            </>
          </>
        )}
      </section>
    </div>
  );
};

export default RiderPage;
