import assert from "assert";
import { Problem } from "../types/problem";

export const jumpGameHandler = (fn: any) => {
	try {
		const tests = [
			[2, 3, 1, 1, 4],
			[3, 2, 1, 0, 4],
			[2, 0, 0],
			[2, 5, 0, 0],
		];
		const answers = [true, false, true, true];
		for (let i = 0; i < tests.length; i++) {
			const result = fn(tests[i]);
			assert.equal(result, answers[i]);
		}
		return true;
	} catch (error: any) {
		console.log("Error from jumpGameHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeJumpGameJS = `/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    
};`;
const starterCodeJumpGamePY=`class Solution(object):
    def canJump(self, nums):
        """
        :type nums: List[int]
        :rtype: bool
        """
        `;
const starterCodeJumpGameCPP=`class Solution {
public:
    bool canJump(vector<int>& nums) {
        
    }
};`;

export const jumpGame: Problem = {
	id: "jump-game",
	title: "3. Jump Game",
	problemStatement: `<p class='mt-3'>
    Bạn được cho một mảng số nguyên <code>nums</code>. Bạn được đặt ở vị trí ban đầu tại <strong>first index</strong>
    và mỗi phần tử trong mảng đại diện cho độ dài nhảy tối đa của bạn tại vị trí đó.
  </p>
    <p class='mt-3'>
    Return <code>true</code> nếu bạn có thể đến được last index, hoặc <code>false</code> nếu không được.
    </p>
  `,

	examples: [
		{
			id: 0,
			inputText: `nums = [2,3,1,1,4]`,
			outputText: `true`,
			explanation: "Nhảy 1 bước từ index 0 đến 1, rồi 3 bước tới last index.",
		},
		{
			id: 1,
			inputText: `nums = [3,2,1,0,4]`,
			outputText: `false`,
			explanation:
				"Bạn sẽ luôn đến index số 3 bất kể điều gì. Độ dài nhảy tối đa của nó là 0, điều này khiến việc đến được last index là không thể.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 10^4</code></li>
    <li class='mt-2'><code>0 <= nums[i] <= 10^5</code></li>`,
	starterCodeJS: starterCodeJumpGameJS,
	handlerFunction: jumpGameHandler,
	starterFunctionName: "function canJump(",
	order: 3,
};
