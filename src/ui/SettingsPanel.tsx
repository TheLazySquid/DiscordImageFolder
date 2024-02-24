import { formElements } from "../modules";

const React = BdApi.React;
const FormSwitch = formElements.FormSwitch;

// this is scuffed but it's easy
export let settings: { rerender: boolean } = {
    rerender: BdApi.Data.load("ImageFolder", "rerender") ?? true
}

export default function SettingsPanel() {
    const [rerender, setRerender] = React.useState(settings.rerender)

    return (
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
    )
}