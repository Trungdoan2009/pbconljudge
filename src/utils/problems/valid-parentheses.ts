import assert from "assert";
import { Problem } from "../types/problem";

export const validParenthesesHandler = (fn: any) => {
	try {
		const tests = ["()", "()[]{}", "(]", "([)]", "{[]}"];
		const answers = [true, true, false, false, true];
		for (let i = 0; i < tests.length; i++) {
			const result = fn(tests[i]);
			assert.deepEqual(result, answers[i]);
		}
		return true;
	} catch (error: any) {
		console.error("Error from validParenthesesHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeValidParenthesesJS = `function validParentheses(s) {
  // Write your code here
};`;
const starterCodeValidParenthesesPY = `class Solution(object):
    def isValid(self, s):
        """
        :type s: str
        :rtype: bool
        """
        ;`;
const starterCodeValidParenthesesCPP = `class Solution {
public:
    bool isValid(string s) {
        
    }
};`;

export const validParentheses: Problem = {
	id: "valid-parentheses",
	title: "4. Valid Parentheses",
	problemStatement:`<p class='mt-3'>Cho một chuỗi <code>s</code> chỉ chứa các ký tự <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code>, và <code>']'</code>, xác định xem chuỗi đầu vào có hợp lệ không.</p>
	<p class='mt-3'>Một chuỗi đầu vào là hợp lệ nếu:</p>
	<ul>
		<li class='mt-2'>Các dấu ngoặc mở phải được đóng bằng cùng loại dấu ngoặc.</li>
		<li class='mt-3'>Các dấu ngoặc mở phải được đóng theo thứ tự chính xác.</li>
		<li class="mt-3">Mỗi dấu ngoặc đóng phải có một dấu ngoặc mở tương ứng cùng loại.</li>
	</ul>`
	,
	examples: [
		{
			id: 0,
			inputText: 's = "()"',
			outputText: "true",
		},
		{
			id: 1,
			inputText: 's = "()[]{}"',
			outputText: "true",
		},
		{
			id: 2,
			inputText: 's = "(]"',
			outputText: "false",
		},
		{
			id: 3,
			inputText: 's = "([)]"',
			outputText: "false",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= s.length <= 10<sup>4</sup></code></li>
<li class='mt-2 '><code>s</code> consists of parentheses only <code class="text-md">'()[]{}'</code>.</li>`,
	handlerFunction: validParenthesesHandler,
	starterCodeJS: starterCodeValidParenthesesJS,
	starterCodeCPP: starterCodeValidParenthesesCPP,
	starterCodePY: starterCodeValidParenthesesPY,
	starterFunctionName: "function validParentheses(",
	order: 4,
};