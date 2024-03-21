在 VS Code 中，你可以使用内置的 Emmet（也被称为 Zen Coding）插件来快速生成 HTML 表达式。Emmet 是一个代码生成工具，可以帮助你编写更快的 HTML、XML、CSS 等代码。

以下是如何使用 Emmet 在 VS Code 中快速生成 HTML 表达式的步骤：

1. 打开 VS Code。
2. 创建一个新的 HTML 文件（`.html` 扩展名）。
3. 在文件中输入你想要的 HTML 结构的 Emmet 缩写。例如，要生成一个包含 id 为 `myDiv` 的 div，你可以在文件中输入 `div#myDiv`。
4. 按 `Tab` 键。VS Code 的 Emmet 插件会自动扩展这个缩写，生成完整的 HTML 代码。在这个例子中，它将生成 `<div id="myDiv"></div>`。

以下是一些其他的 Emmet 缩写示例：

* `ul>li*5`：生成一个包含 5 个列表项的无序列表
* `ul>li.item*5>div>{text-content$}`：生成一个包含 5 个列表项的无序列表，每个text-content 都包含一个遍历的下标
* `div#content>p>a{Click me}`：生成一个包含链接的段落，链接的文本是 "Click me"
* `form#search.wide>input[type="text"][name="q"].search-box`：生成一个带有特定类和属性的表单和输入框

请注意，如果你没有在 VS Code 中看到 Emmet 的功能，你可能需要手动启用它。你可以通过以下步骤来启用 Emmet：

1. 打开 VS Code 的设置（通过按 `Ctrl` + `,` 或者在菜单中选择 `File > Preferences > Settings`）。
2. 在搜索框中输入 `emmet`。
3. 确保 "Enable Emmet" 的选项已经被选中。
