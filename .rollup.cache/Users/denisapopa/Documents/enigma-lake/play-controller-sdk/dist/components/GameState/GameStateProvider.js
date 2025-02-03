import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useState } from "react";
import { GameStateContext } from "./GameStateContext";
import { AUTO_PLAY_STATE, GAME_MODE } from "../types/gameMode";
import styles_ui from './UI.module.scss';
import ManualPlayController from "../ManualPlayController";
import AutoPlayController from "../AutoPlayController";
import cx from "classnames";
import { Switch } from "../base/Switch/Switch";
const GameStateProvider = ({ children, config }) => {
    const [mode, setMode] = useState(GAME_MODE.MANUAL);
    const [autoplayState, setAutoplayState] = useState(AUTO_PLAY_STATE.IDLE);
    const [playedRounds, setPlayedRounds] = useState(0);
    const [selection, setSelection] = useState([]);
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);
    const [numberOfPlays, setNumberOfPlays] = useState(0);
    // Handlers
    const startAutoplay = useCallback((numberOfPlays) => {
        setMode(GAME_MODE.AUTOPLAY);
        setAutoplayState(AUTO_PLAY_STATE.SELECTING);
        setNumberOfPlays(numberOfPlays);
        setPlayedRounds(0); // Reset rounds when starting autoplay
    }, []);
    const stopAutoplay = useCallback(() => {
        setAutoplayState(AUTO_PLAY_STATE.IDLE);
        setMode(GAME_MODE.MANUAL);
    }, []);
    const playManualMode = useCallback(() => {
        setMode(GAME_MODE.MANUAL);
        setAutoplayState(AUTO_PLAY_STATE.IDLE);
    }, []);
    const changeAutoplayState = useCallback((newState) => {
        setAutoplayState(newState);
    }, []);
    const resetState = useCallback(() => {
        setMode(GAME_MODE.MANUAL);
        setAutoplayState(AUTO_PLAY_STATE.IDLE);
        setPlayedRounds(0);
        setNumberOfPlays(0);
    }, []);
    const toggleMode = () => setMode((prev) => (prev === GAME_MODE.MANUAL ? GAME_MODE.AUTOPLAY : GAME_MODE.MANUAL));
    const changeSelection = (values) => {
        if (isAutoPlaying) {
            return;
        }
        setSelection(values);
    };
    const contextValue = {
        mode,
        isAutoPlaying,
        autoplayState,
        playedRounds,
        numberOfPlays,
        setIsAutoPlaying,
        startAutoplay,
        stopAutoplay,
        setAutoplayState,
        setPlayedRounds,
        setNumberOfPlays,
        playManualMode,
        changeAutoplayState,
        resetState,
        toggleMode,
        config,
        selection,
        setSelection: changeSelection,
    };
    return (_jsxs(GameStateContext.Provider, { value: contextValue, children: [typeof children === "function" ? children(contextValue) : children, config.playOptions.displayController ?
                _jsxs("div", { className: cx(styles_ui.base, styles_ui.betForm), style: {
                        "--bet-bottom": "50px",
                    }, children: [_jsx(Switch, { enabled: mode !== GAME_MODE.MANUAL, setEnabled: toggleMode }), mode === GAME_MODE.MANUAL ?
                            _jsx(ManualPlayController, {}) :
                            _jsx(AutoPlayController, {})] }) : null] }));
};
export default GameStateProvider;
//# sourceMappingURL=GameStateProvider.js.map