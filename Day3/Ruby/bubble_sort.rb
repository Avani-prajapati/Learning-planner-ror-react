def bubble_sort(arr)
  for i in 0...arr.length-1
     for j in i+1...arr.length
         if (arr[i] > arr[j])
          arr[i], arr[j] = arr[j], arr[i]
         end   
     end 
  end  
  arr
end  

arr = [0,9,8,3]
puts bubble_sort(arr)