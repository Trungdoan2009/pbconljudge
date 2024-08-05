import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeTwoSumJS = `function twoSum(nums,target){
  // Write your code here
};`;
const starterCodeTwoSumCPP = `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`;
const starterCodeTwoSumPython = `class Solution(object):
    def twoSum(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """`;

const handlerTwoSum = (fn: any) => {
	// fn is the callback that user's code is passed into
	try {
		const nums = [
			[2, 7, 11, 15],
			[3, 2, 4],
			[3, 3],
		];

		const targets = [9, 6, 6];
		const answers = [
			[0, 1],
			[1, 2],
			[0, 1],
		];

		// loop all tests to check if the user's code is correct
		for (let i = 0; i < nums.length; i++) {
			// result is the output of the user's function and answer is the expected output
			const result = fn(nums[i], targets[i]);
			assert.deepStrictEqual(result, answers[i]);
		}
		return true;
	} catch (error: any) {
		console.log("twoSum handler function error");
		throw new Error(error);
	}
};

export const twoSum: Problem = {
	id: "two-sum",
	title: "1. Two Sum",
	problemStatement: `<p class='mt-3'>
  Cho một mảng các số nguyên <code>nums</code> và 1 số nguyên <code>target</code>, trả về
  <em>chỉ số của hai số sao cho chúng cộng lại bằng</em> <code>target</code>.
</p>
<p class='mt-3'>
  Bạn có thể giả định rằng mỗi đầu vào sẽ có <strong>một giải pháp duy nhất</strong>, và bạn không thể sử dụng cùng một phần tử hai lần.
</p>
<p class='mt-3'>Bạn có thể trả về câu trả lời theo bất kỳ thứ tự nào.</p>`,
	examples: [
		{
			id: 1,
			inputText: "nums = [2,7,11,15], target = 9",
			outputText: "[0,1]",
			explanation: "Bởi vì nums[0] + nums[1] == 9, nên return [0, 1].",
		},
		{
			id: 2,
			inputText: "nums = [3,2,4], target = 6",
			outputText: "[1,2]",
			explanation: "Bởi vì nums[1] + nums[2] == 6, nên return [1, 2].",
		},
		{
			id: 3,
			inputText: " nums = [3,3], target = 6",
			outputText: "[0,1]",
		},
	],
	constraints: `<li class='mt-2'>
  <code>2 ≤ nums.length ≤ 10</code>
</li> <li class='mt-2'>
<code>-10 ≤ nums[i] ≤ 10</code>
</li> <li class='mt-2'>
<code>-10 ≤ target ≤ 10</code>
</li>
<li class='mt-2 text-sm'>
<strong>Chỉ có 1 đáp án tồn tại</strong>
</li>`,
	handlerFunction: handlerTwoSum,
	starterCodeJS: starterCodeTwoSumJS,
	order: 1,
	starterFunctionName: "function twoSum(",
};
