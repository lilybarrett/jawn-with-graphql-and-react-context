import React from "react";

export interface JawnState {
    market: "US" | "UK";
}

export default React.createContext<JawnState>(null);
