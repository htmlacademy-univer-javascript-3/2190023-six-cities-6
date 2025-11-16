import type { store } from "../store";

declare global {
    type RootState = ReturnType<typeof store.getState>;
    type AppDispatch = typeof store.dispatch;
}