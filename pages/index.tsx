import { NextPage } from "next";
import React from "react";
import Auth from "../lib/components/Auth";
import Todos from "../lib/components/Todos";

const Index: NextPage = () => (
  <div>
    <Auth />
    <Todos />
  </div>
);

export default Index;
