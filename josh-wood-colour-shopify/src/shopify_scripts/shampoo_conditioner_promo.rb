discount = Money.new(cents: 100) * 5

# staging products
# conditioners = [293480235037, 293480431645, 293481283613, 293481054237]
# shampoos = [293479677981, 293479022621, 293478465565, 293477875741]

# production products
conditioners = [553949298711, 553949560855, 553949102103, 553949429783]
shampoos = [553949364247, 553948971031, 553949200407, 553949036567]

conditioners_seen = []
shampoos_seen = []

Input.cart.line_items.each do |line_item|
  product = line_item.variant.product

  if shampoos.include?(product.id)
    for i in 1..line_item.quantity do
      shampoos_seen << product.id
    end
  end

  if conditioners.include?(product.id)
    for i in 1..line_item.quantity do
      conditioners_seen << product.id
    end
  end
end

# puts "total conditioners: #{conditioners_seen.size}"
# puts "total shampoos: #{shampoos_seen.size}"

if conditioners_seen.size > 0 and shampoos_seen.size > 0
  total_eligible_items = conditioners_seen.size < shampoos_seen.size ? conditioners_seen.size : shampoos_seen.size
  total_eligible_items_remaining = total_eligible_items
  sorted_items = Input.cart.line_items.sort_by { |line_item| line_item.quantity }

  # puts "total eligible items: #{total_eligible_items}"

  sorted_items.each do |line_item|
    break if total_eligible_items_remaining == 0

    if total_eligible_items_remaining > 0
      product = line_item.variant.product

      if conditioners_seen.include?(product.id)
        # puts "-- discounts still available: #{total_eligible_items_remaining}"

        discounted_items = conditioners_seen.count(product.id)
        
        if discounted_items > total_eligible_items_remaining
          discounted_items = total_eligible_items_remaining
        end
        
        new_price = line_item.original_line_price - (discount * discounted_items)
        total_eligible_items_remaining = total_eligible_items_remaining - discounted_items

        line_item.change_line_price(new_price, message: "Promo: discount product")

        # puts "-- item quantity discounted: #{discounted_items}"
        # puts "-- discounts now remaining: #{total_eligible_items_remaining}"
      end
    end
  end
end

Output.cart = Input.cart
