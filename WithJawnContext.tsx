import React from "react";
import JawnContext, { JawnState } from "./JawnContext";

export default function WithJawnContext<Props extends JawnState> (Child: React.ComponentType<Props>) {
        return (props: Props) => (
            <JawnContext.Consumer>
                {(contextState) => (
                    <Child {...props} {...contextState} />
                )}
            </JawnContext.Consumer>
        );
}
