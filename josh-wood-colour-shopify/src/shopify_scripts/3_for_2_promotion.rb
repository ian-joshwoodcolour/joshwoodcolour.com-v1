total_items = 0

Input.cart.line_items.each do |line_item|
  total_items += line_item.quantity
end

total_eligible_items = (total_items / 3).floor

# puts "total items: #{total_items}"
# puts "total items eligible for discount: #{total_eligible_items}"
# puts ''

if total_eligible_items > 0
  total_eligible_items_remaining = total_eligible_items
  sorted_items = Input.cart.line_items.sort_by { |line_item| line_item.variant.price }
  
  sorted_items[0..(total_eligible_items - 1)].each do |line_item|
    break if total_eligible_items_remaining == 0
    
    # puts "current item: #{line_item.variant.id}"
    
    if total_eligible_items_remaining > 0
      # puts "-- discounts still available: #{total_eligible_items_remaining}"
      # puts "-- item quantity: #{line_item.quantity}"

      discounted_items = 1

      if line_item.quantity > 1  
        if line_item.quantity > total_eligible_items_remaining
          discounted_items = total_eligible_items_remaining
        else
          discounted_items = line_item.quantity
        end
      end

      new_price = line_item.original_line_price - (line_item.variant.price * discounted_items)
      total_eligible_items_remaining = total_eligible_items_remaining - discounted_items

      line_item.change_line_price(new_price, message: "3 for 2 – free product")

      # puts "---- items discounted: #{discounted_items}"
      # puts "---- discounts now remaining: #{total_eligible_items_remaining}"
    end

    # puts ''
  end
end

Output.cart = Input.cart
