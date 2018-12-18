/* 1.1: Is Unique: Implement an algorithm to determine if a string has all unique characters. What if you cannot use additional data structures?
- Main goal: find a character that is used more than once
*/

const isUnique = (string) => {
  for (let i = 0; i <string.length; i++) {
    let currentLetter = string[i]

    for (let next = i+1; next <string.length; next ++) {
      if(currentLetter === string[next]){
        return false
      }
    }
  }
  return true
}

/* 1.2 Check Permutation: Given two strings, write a method to decide if one is a permutation of the other.

Permutation is when the order matters. ABC !== CBA

- Main Goal: Give false if they do not have the same letter count. For this, it's important to note that we don't have to go through both items and may be able to optimize it.

*/

const checkPermutation = (string1, string2) => {
  if(string1.length !== string2.length) { return false }
  let countObject = {}
  for (let i = 0; i < string1.length; i++) {
    let current = string1[i]
    if(countObject[current]) {
      countObject[current]++
    } else {
      countObject[current] = 1
    }
  }

  for (let m = 0; m <string1.length; m++) {
    let second = string2[m]
    if(countObject[second] && countObject[second]>0) {
      countObject[second] --;
    } else {
      return false
    }
  }
  return true
}

/* 1.3 URLify: Write a method to replace all spaces in a string with '%20'. You may assume that the string has sufficient space at the end to hold the additional characters, and that you are given the 'true' length of the string.

- The Main Goal: Find the space and add the URLCode

*/

const URLify = (string, length) => {
  let noSpace = string.trim().split(' ')
  return noSpace.join('%20')
}

/* Palindrome Permutation: Given a string, write a function to check if it is a permutation of a palindrome. A palindrome is a word or phrase that is the same forwards and backwards. A permutation is a rearrangement of letters. The palindrome does not need to be limited to just dictionary words.

- The Main Goal: What makes a palindrome would be if it's an even number of letters, there is an even amount of letters that occur. If there is an odd number, there would be two even and one odd. Mod of 2

*/

const palindromePermutation = (string) => {
  let newString = string.split(' ').join('')
  let counter = {};
  let odd = 0;

  for(let i = 0; i <newString.length; i++) {
    let current = newString[i]
    if(counter[current]) {
      counter[current]++
    } else {
      counter[current] = 1
    } 
  }

  for (let keys in counter) {
    let value =  (counter[keys]) %2
    if(value === 1) {
      odd ++
    }
  }

  if(newString.length % 2 === 0) {
    if(odd > 0) { return false}
  } else {
    return (odd == 1)
  }

  return true
}

/* 1.5 One Away: There are three types of edits that can be performed on strings: insert a character, remove a character, or replace a character. Given two strings, write a function to check if they are one edit (or zero edits) away.

- Main Goal: Check to see if there's an additional character or a deleted character, or no change
*/

const oneAway = (string1, string2) => {
  if (Math.abs(string1.length - string2.length) > 1) {
    return false;
  } else if (string1.length === string2.length) {
    // this means that one might be replaced
    let difference = 0;
    
    for (let i = 0; i < string1.length; i++) {
      if(string1[i] !== string2[i]) {
        difference ++
      }
    }
    if(difference > 1) {
      return false
    }
  } else {
    //this means that a character was added or removed
    let bigWord = string2.split('');
    let smallWord = string1.split('');
    if(string1.length > string2.length) {
      bigWord = string1.split('');
      smallWord = string2.split('');
    }

    let difference = 0;
    let bigIndex = bigWord.length-1
    let smallIndex = smallWord.length-1
    console.log(smallIndex)

    while(difference < 2 && smallWord.length > 0) {
      if(bigWord[bigIndex] == smallWord[smallIndex]){
        bigIndex --;
        smallIndex --;
      } else {
        difference ++;
        bigIndex --;
      }
    }
    if(difference > 1) {return false}

  }
  return true
} 

/* 1.6 String Compression: Implement a method to perform basic string compression using the counts of repeated characters. For example, the string aabccccaa would become a2b1c5a3. If the 'compressed sstring' would not become smaller than the original string, your method should return the origin string. You can assume the string only has uppercase and lowercase letters.
*/

const stringCompression = (string) => {
  let count = 0;
  let wordCount = '';
  let lastLetter = string[0];

  for(let i = 0; i <string.length; i++) {
    if(string[i] == lastLetter) {
      lastLetter = string[i]
      count++;
    } else {
      wordCount +=lastLetter+count
      lastLetter = string[i]
      count =1
    }

    if(i ==string.length-1){
      wordCount +=lastLetter+count
    }
  }

  return wordCount
}

/* 1.7 Rotate Matrix: Given an image represented by an NxN matrix, where each pixel in the image is 4 bytes, write a method to rotate the image by 90 degrees. Can you do this in place?

Main Goal - Keeping the matrix in place. Have a variable that holds the previous and the new variable.

[[1,2,3],
 [4,5,6]
 [7,8,9]]

 [[7,4,1],
 [8,5,2]
 [9,6,3]]

 The coordinates moved =>
 n = 3
 [0,0] => [0,2]
 [1,0] => [0,1]
 [2,0] => [0,0]

 [0,1] => [1,2]
 [0,2] => [2,2]

 [2,1] => [1,0]

 [i,j]

 [0,0] => 
 1. switch i, j 
 [0,0] => 
 2. j = n - 1 - i
 [0,1]

 [0,1] => 
 1.switch
 [1,0] =>
 2. j = n - 1 - i
 [1,2]

 [0,2] => 
 1. switch
 [2,0] =>
 2. j = n - 1 - i 
 [2,2]

 [2,1] =>
 1. switch
 [1,2] => 
 2. j = n - 1 - i
 [1,0]
*/

const matrixRotate = (matrix) => {
  let n = matrix.length
  let maxLayer = Math.floor(matrix.length / 2)
  let layer = 0
  let end = n -1

  while(layer < maxLayer) {
    for(let i = 0; i < n-1; i++) {
      let temp = matrix[end-layer-i][layer]

      matrix[end-layer-i][layer] = matrix[end-layer][end - layer - i]
      matrix[end-layer][end - layer - i] = matrix[layer+i][end-layer]
      matrix[layer+i][end-layer] = matrix[layer][layer+i]
      matrix[layer][layer+i] = temp
    }
    layer ++;
    n -= 2;
  }
  return matrix
}

/* 1.8 Write an alogirthm such that if an element in an NxM matrix is 0, the entire row and column turn to 0's.

Main Goal: find a 0 and have a key that shows if it's been seen or not
example 1: 
[
  1,2,3
  4,0,5
  6,7,8
] =>
[
  1,0,3
  0,0,0,
  6,0,8
]
step 1. make zeros to false
step 2. iterate through again and make null row and colum to zero
*/

const makeFalse = (matrix) => {
  let row = 0
  while(row < matrix.length) {
    let rowData = matrix[row]
    for(let i=0; i <rowData.length ;i++) {
      if(rowData[i] === 0) {
        rowData[i] = false
      }
    }
    row ++;
  }
  return matrix
}

const makeZero = (matrix, row, col) => {
  for(let i = 0; i < matrix[row].length; i++){
    if(matrix[row][i] !== false)
    matrix[row][i] = 0
  }
  for(let i = 0;i < matrix.length; i++){
    if(matrix[i][col]!== false){
      matrix[i][col] = 0
    }
  }
}

const zeroMatrix = (matrix) => {
  let falseMatrix = makeFalse(matrix)
  let row = 0
  while(row < falseMatrix.length) {
    for(let i = 0; i < falseMatrix[row].length; i++){
      if(falseMatrix[row][i] === false){
        falseMatrix[row][i] = 0
        makeZero(falseMatrix, row, i)
      }
    }
    row ++
  }
  return falseMatrix
}

/* 1.9 Assume you have a function isSubString which checks if one word is a substring of another word. Given two strings s1 and s2, write a function using only one call to isSubString.
*/

const rotateSub = (string1, string2) => {
  return isSubString(string1+string1, string2)
}
