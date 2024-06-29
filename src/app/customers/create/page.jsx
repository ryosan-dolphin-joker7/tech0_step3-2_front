"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import createCustomer from "./createCustomer";
import Link from "next/link";

export default function CreatePage() {
  const formRef = useRef();
  const router = useRouter();
  const [customerID, setCustomerID] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    await createCustomer(formData);
    router.push(`./create/confirm?customer_id=${formData.get("customer_id")}`);
  };

  const handleCustomerIDChange = (event) => {
    setCustomerID(event.target.value);
  };

  return (
    <>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-md m-4">
        <div className="m-4 card bordered bg-blue-200 duration-200 hover:border-r-red">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="card-body">
              <h2 className="card-title">
                <p>
                  <input
                    type="text"
                    name="customer_name"
                    placeholder="桃太郎"
                    className="input input-bordered"
                  />
                </p>
              </h2>
              <p>
                Customer ID:
                <input
                  type="text"
                  name="customer_id"
                  placeholder="C030"
                  className="input input-bordered"
                  value={customerID}
                  onChange={handleCustomerIDChange}
                />
              </p>

              <p>
                Age:
                <input
                  type="number"
                  name="age"
                  placeholder="30"
                  className="input input-bordered"
                />
              </p>
              <p>
                Gender:
                <input
                  type="text"
                  name="gender"
                  placeholder="女"
                  className="input input-bordered"
                />
              </p>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="btn btn-primary m-4 text-2xl"
                disabled={!customerID}
              >
                作成
              </button>
              <Link href="/">
                <button className="btn btn-primary m-4 text-2xl">戻る</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
