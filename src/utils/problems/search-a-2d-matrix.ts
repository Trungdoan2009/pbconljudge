import assert from "assert";
import { Problem } from "../types/problem";
import example1 from "./images/search-a-2d-1.jpg";
import example2 from "./images/search-a-2d-2.jpg";

export const search2DMatrixHandler = (fn: any) => {
	try {
		const tests = [
			{
				matrix: [
					[1, 3, 5, 7],
					[10, 11, 16, 20],
					[23, 30, 34, 60],
				],
				target: 3,
			},
			{
				matrix: [
					[1, 3, 5, 7],
					[10, 11, 16, 20],
					[23, 30, 34, 60],
				],
				target: 13,
			},
		];
		const answers = [true, false];
		for (let i = 0; i < tests.length; i++) {
			const result = fn(tests[i].matrix, tests[i].target);
			assert.deepEqual(result, answers[i]);
		}
		return true;
	} catch (error: any) {
		console.log("Error from searchA2DMatrixHandler: ", error);
		throw new Error(error);
	}
};
const starterCodeSearch2DMatrixJS = `// Do not edit function name
function searchMatrix(matrix, target) {
  // Write your code here
};`;
const starterCodeSearch2DMatrixCPP = `class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        
    }
};`;
const starterCodeSearch2DMatrixPY = `class Solution(object):
    def searchMatrix(self, matrix, target):
        """
        :type matrix: List[List[int]]
        :type target: int
        :rtype: bool
        """
        `;
export const search2DMatrix: Problem = {
	id: "search-a-2d-matrix",
	title: "5. Search a 2D Matrix",
	problemStatement: `
 	<p class='mt-3'>Viết một thuật toán hiệu quả để tìm kiếm một giá trị trong một ma trận <code>m x n</code>. Ma trận này có các thuộc tính sau:</p>
	<li class="mt-3">Các số nguyên trong mỗi hàng được sắp xếp từ trái sang phải.</li>
	<li class="mt-3">Số nguyên đầu tiên của mỗi hàng lớn hơn số nguyên cuối cùng của hàng trước đó.</li>
	<p class='mt-3'>Cho <code>matrix</code>, một ma trận <code>m x n</code>, và <code>target</code>, trả về <code>true</code> nếu <code>target</code> có trong ma trận, và <code>false</code> nếu không.</p>
  `,
	examples: [
		{
			id: 0,
			inputText: `matrix = [
  [1,3,5,7],
  [10,11,16,20],
  [23,30,34,60]
], target = 3`,
			outputText: `true`,
			img: example1.src,
		},
		{
			id: 1,
			inputText: `matrix = [
  [1,3,5,7],
  [10,11,16,20],
  [23,30,34,60]
], target = 13`,
			outputText: `false`,
			img: example2.src,
		},
		{
			id: 2,
			inputText: `matrix = [[1]], target = 1`,
			outputText: `true`,
		},
	],
	constraints: `
  <li class='mt-2'><code>m == matrix.length</code></li>
  <li class='mt-2'><code>n == matrix[i].length</code></li>
  <li class='mt-2'><code>1 <= m, n <= 100</code></li>
  <li class='mt-2'><code>-10<sup>4</sup> <= matrix[i][j], target <= 10<sup>4</sup></code></li>
  `,
	starterCodeJS: starterCodeSearch2DMatrixJS,
	handlerFunction: search2DMatrixHandler,
	starterFunctionName: "function searchMatrix",
	order: 5,
};
