import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import cx from "classnames";
import ManualPlayController from "../ManualPlayController";
import AutoPlayController from "../AutoPlayController";
import { GAME_MODE } from "../types/gameMode";
import styles_ui from './UI.module.scss';
import { useGameState } from "../GameState/GameStateContext";
const PlayController = () => {
    const { mode, toggleMode } = useGameState();
    return (_jsxs("div", { className: cx(styles_ui.base, styles_ui.betForm), style: {
            "--bet-bottom": "50px",
        }, children: [_jsxs("div", { children: ["Game mode: ", mode] }), _jsx("button", { onClick: toggleMode, children: "Toggle Mode" }), mode === GAME_MODE.MANUAL ?
                _jsx(ManualPlayController, {}) :
                _jsx(AutoPlayController, {})] }));
};
const PlayControllerWrapper = ({ children, config }) => {
    return (_jsx(_Fragment, {}));
    // return (
    //   <GameStateProvider config={config}>
    //     {children}
    //   </GameStateProvider>
    // )
};
export default PlayControllerWrapper;
//# sourceMappingURL=PlayControllerWrapper.js.map