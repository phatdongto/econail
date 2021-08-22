  import React from "react";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { useRouteMatch, useParams, useLocation, Link } from "react-router-dom";
  import EditInvoice from "./EditInvoice";
  import ViewInvoice from "./ViewInvoice";
  import Button from "@iso/ui/Antd/Button/Button";
  import Loader from "@iso/components/utility/loader";
  import invoiceActions from "@iso/redux/invoice/actions";
  import AntTable from "./AntTables/AntTables";
  const SingleInvoice = _ => {
    
    const { state } = useLocation();
    const dispatch = useDispatch();
    const match = useRouteMatch();
    // const { invoiceId } = useParams();

    const [editing, setEditing] = useState(0);
    // componentWillReceiveProps(nextProps) {
    //   this.toggleCreatedInvoice(nextProps);
    // }
    // const redirectPath = match.url.replace(invoiceId, '');

    return (
      <>
        {editing == 1 ? (
          <>
            <Button color="secondary" onClick={() => setEditing(0)}>
              <span>Chỉnh sửa</span>
            </Button>
            <EditInvoice {...state.customer} />
          </>
        ) : (
          <>
            <Button color="secondary" onClick={() => setEditing(1)}>
              <span>Trở lại</span>
            </Button>
            <ViewInvoice {...state.customer} />
          </>
        )}
      </>
    );
  };
  export default SingleInvoice;
