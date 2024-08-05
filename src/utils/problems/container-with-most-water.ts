import assert from "assert";
import { Problem } from "../types/problem";
import example from "./images/container-with-most-water.jpg";

// Handler function to run and test the provided function
export const containerWithMostWaterHandler = (fn: (height: number[]) => number) => {
	try {
		const tests: [number[], number][] = [
			[[1, 8, 6, 2, 5, 4, 8, 3, 7], 49],
			[[1, 1], 1],
		];

		for (const [input, expected] of tests) {
			const result = fn(input);
			assert.strictEqual(result, expected, `Test failed for input ${JSON.stringify(input)}. Expected ${expected}, got ${result}`);
		}

		return true;
	} catch (error: any) {
		if (error instanceof assert.AssertionError) {
			console.error("AssertionError: ", error.message);
			throw new Error("Test case failed: " + error.message);
		} else {
			console.error("Error from containerWithMostWaterHandler: ", error);
			throw new Error("Handler error: " + error.message);
		}
	}
};

// Starter code for the container with most water problem
const starterCodeContainerWithMostWaterJS = `
/**
 * @param {number[]} height
 * @return {number}
 */
function maxArea(height) {
  // Write your code here
}
`;

// Problem definition
export const containerWithMostWater: Problem = {
	id: "container-with-most-water",
	title: "Container with Most Water",
	problemStatement: `<p class='mt-3'>
  Bạn được cho một mảng số nguyên <code>height</code> có độ dài <code>n</code>. Có <code>n</code> đường thẳng đứng được vẽ sao cho hai điểm đầu của đường thẳng thứ <code>i<sup>th</sup></code> là <code>(i, 0)</code> và <code>(i, height[i])</code>.
</p>
<p class='mt-3'>
  Tìm hai đường thẳng sao cho cùng với trục x tạo thành một container chứa nhiều nước nhất.
</p>
<p class='mt-3'>
  Trả về lượng nước tối đa mà một container có thể chứa.
</p>
<p class='mt-3'>
  <strong>Lưu ý: Bạn không được nghiêng container.</strong>
</p>
`,
	examples: [
		{
			id: 0,
			inputText: "height = [1,8,6,2,5,4,8,3,7]",
			outputText: "49",
			explanation: "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.",
            img: example.src
		},
		{
			id: 1,
			inputText: "height = [1,1]",
			outputText: "1",
		},
	],
	constraints: `<li class='mt-2'><code>n == height.length</code></li>
	<li class='mt-2'><code>2 <= n <= 10^5</code></li>
	<li class='mt-2'><code>0 <= height[i] <= 10^4</code></li>`,
	starterCodeJS: starterCodeContainerWithMostWaterJS,
	handlerFunction: containerWithMostWaterHandler,
	starterFunctionName: "maxArea",
	order: 6,
};
