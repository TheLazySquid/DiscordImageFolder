import { formElements } from "../constants";
import type { sortType } from "../types";

const React = BdApi.React;
const { FormSwitch } = formElements

// this is scuffed but it's easy
export let settings: { rerender: boolean, sortBy: sortType } = {
    rerender: BdApi.Data.load("ImageFolder", "rerender") ?? true,
    sortBy: BdApi.Data.load("ImageFolder", "sorting") ?? "lastSent"
}

export default function SettingsPanel() {
    const [rerender, setRerender] = React.useState(settings.rerender)
    const [sortBy, setSortBy] = React.useState(settings.sortBy)

    return (
        <div className="if-settings">
            <FormSwitch
                note="This will allow you to send AVIFs and sequenced WebPs (albeit without animation) and have them properly embed"
                value={rerender}
                onChange={(checked: boolean) => {
                    BdApi.Data.save("ImageFolder", "rerender", checked)
                    settings.rerender = checked
                    setRerender(checked)
                }}
            >
                Re-render images as PNG before sending
            </FormSwitch>
            <div className="if-sel-heading">
                Image Sorting
            </div>
            <select
                value={sortBy}
                onChange={(e) => {
                    BdApi.Data.save("ImageFolder", "sorting", e.target.value)
                    settings.sortBy = e.target.value as sortType
                    setSortBy(e.target.value as sortType)
                }}>
                <option value="lastSent">Sort by last sent</option>
                <option value="name">Sort by name</option>
                <option value="lastModified">Sort by last modified</option>
            </select>
        </div>
    )
}