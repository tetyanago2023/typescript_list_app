import './css/style.css'
import FullList from "./model/FullList.ts";
import ListTemplate from "./templates/ListTemplate.ts";
import ListItem from "./model/ListItem.ts";

const initApp = (): void => {
    const fullList = FullList.instance
    const template = ListTemplate.instance

    const itementryForm = document.getElementById("itemEntryForm") as HTMLFormElement
    itementryForm.addEventListener("submit", (event: SubmitEvent): void => {
        event.preventDefault()
        const itemInput = document.getElementById("newItem") as HTMLInputElement
        const newEntryText: string = itemInput.value.trim()
        if (!newEntryText) return

        const itemID: number = fullList.list.length ? parseInt(fullList.list[fullList.list.length - 1].id) + 1 : 1
        const newItem = new ListItem(itemID.toString(), newEntryText)

        fullList.addItem(newItem)
        template.render(fullList)
    })

    const clearItems = document.getElementById("clearItemsButton") as HTMLButtonElement
    clearItems.addEventListener("click", (): void => {
        fullList.clearList()
        template.clear()
    })

    fullList.load()
    template.render(fullList)

}

document.addEventListener("DOMContentLoaded", initApp)