module ResolverHelpers
  def mock_graphql_context(field_name = nil)
    field = double("GraphQL::Field", name: field_name.to_s.camelize(:lower)) if field_name
    double("GraphQL::Query::Context", field: field)
  end

  def mock_arguments(args = {})
    double("GraphQL::Query::Arguments", to_h: args.with_indifferent_access)
  end
end

RSpec.configure do |config|
  config.include ResolverHelpers, type: :resolver
end
